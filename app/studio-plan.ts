export const stages = {
  captura: {
    label: "Validar captura",
    tasks: [
      "Gravar um trecho curto no PS5 com OBS",
      "Revisar fluidez, volume e sincronismo",
      "Escolher um trecho e testar o corte vertical",
    ],
  },
  edicao: {
    label: "Editar o primeiro clipe",
    tasks: [
      "Selecionar um trecho que funcione sozinho",
      "Cortar sobras e revisar as legendas",
      "Exportar e conferir o arquivo final",
    ],
  },
  publicacao: {
    label: "Preparar a publicação",
    tasks: [
      "Escolher o vídeo e definir a promessa do título",
      "Preparar miniatura, descrição e capítulos",
      "Revisar o vídeo e preparar o agendamento",
    ],
  },
} as const;

export type Stage = keyof typeof stages;

export function isStage(value: unknown): value is Stage {
  return typeof value === "string" && Object.hasOwn(stages, value);
}

export function weeklyPlan(hours: number, stage: Stage) {
  const budget = hours * 48;
  const suggestedBlock = Math.min(60, Math.floor(budget / 3));
  const tasks = stages[stage].tasks.map((title) => ({
    title,
    minutes: suggestedBlock,
  }));
  return {
    budget,
    reserve: hours * 12,
    total: suggestedBlock * tasks.length,
    tasks,
  };
}

export function duration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} h ${remainder} min` : `${hours} h`;
}
