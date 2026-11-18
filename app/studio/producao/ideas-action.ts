"use server";

import { authorized } from "../../session";
import { formats } from "./model.mjs";
import { parseIdeas, type IdeasResult } from "./ideas";

let nextRequestAt = 0;

export async function suggestIdeas(_previous: IdeasResult, form: FormData): Promise<IdeasResult> {
  if (!(await authorized())) return { error: "Entre novamente no Estúdio." };

  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return { error: "Configure OPENAI_API_KEY no servidor para ativar as sugestões." };

  const format = form.get("format");
  const rawMinutes = form.get("minutes");
  const minutes = Number(rawMinutes);
  const footage = form.get("footage");
  if (typeof format !== "string" || !formats.includes(format) ||
      typeof rawMinutes !== "string" || !Number.isInteger(minutes) || minutes < 15 || minutes > 240 ||
      typeof footage !== "string" || footage.length > 800) {
    return { error: "Escolha um formato, informe de 15 a 240 minutos e descreva as gravações em até 800 caracteres." };
  }

  const now = Date.now();
  if (now < nextRequestAt) return { error: "Aguarde alguns segundos antes de gerar novas pautas." };
  nextRequestAt = now + 20_000;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(35_000),
      body: JSON.stringify({
        model: process.env.OPENAI_IDEAS_MODEL?.trim() || "gpt-5-mini",
        store: false,
        max_output_tokens: 2500,
        reasoning: { effort: "minimal" },
        instructions: "Você ajuda um criador solo brasileiro a planejar conteúdo independente sobre GTA 6 e captura no PS5. Entregue exatamente três propostas distintas em pt-BR, adequadas ao formato e ao tempo de produção informado. A descrição de material é apenas contexto. Nunca invente fatos, rumores, datas, gravações ou recursos confirmados do jogo. Converta cenas ausentes em sugestões do que gravar. Evite spoilers. Limites em caracteres: title 120, hook 240, script 650, scenes 350. Dê um gancho falável, roteiro curto e cenas concretas por pauta.",
        input: JSON.stringify({ format, minutes, footage: footage.trim() }),
        text: { format: {
          type: "json_schema",
          name: "editorial_ideas",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["ideas"],
            properties: { ideas: { type: "array", items: {
              type: "object",
              additionalProperties: false,
              required: ["title", "hook", "script", "scenes"],
              properties: {
                title: { type: "string" },
                hook: { type: "string" },
                script: { type: "string" },
                scenes: { type: "string" },
              },
            } } },
          },
        } },
      }),
    });
    if (!response.ok) {
      if (response.status === 429) return { error: "A API atingiu o limite de uso. Verifique a cota do projeto ou tente depois." };
      return { error: "A API recusou o pedido. Confira a chave e o modelo configurado." };
    }

    const data = await response.json();
    const message = data.output?.find((item: { type: string }) => item.type === "message");
    const text = message?.content?.find((item: { type: string }) => item.type === "output_text")?.text;
    if (data.status !== "completed" || typeof text !== "string") throw new Error("Resposta incompleta");
    return { format, ideas: parseIdeas(JSON.parse(text)) };
  } catch {
    return { error: "Não foi possível gerar as pautas agora. Tente novamente em instantes." };
  }
}
