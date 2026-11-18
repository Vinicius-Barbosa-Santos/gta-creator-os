export type Idea = { title: string; hook: string; script: string; scenes: string };
export type IdeasResult = { error?: string; format?: string; ideas?: Idea[] };

const limits = { title: 120, hook: 240, script: 650, scenes: 350 } as const;

export function parseIdeas(payload: unknown): Idea[] {
  if (!payload || typeof payload !== "object" || !("ideas" in payload) || !Array.isArray(payload.ideas) || payload.ideas.length !== 3) {
    throw new Error("Resposta inesperada");
  }
  return payload.ideas.map((idea: unknown) => {
    if (!idea || typeof idea !== "object") throw new Error("Pauta inválida");
    const fields = Object.keys(limits) as Array<keyof Idea>;
    const result = {} as Idea;
    for (const field of fields) {
      const value = (idea as Record<string, unknown>)[field];
      if (typeof value !== "string" || !value.trim() || value.length > limits[field]) {
        throw new Error("Campo inválido");
      }
      result[field] = value.trim();
    }
    return result;
  });
}
