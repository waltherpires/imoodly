import { z } from 'zod';

export enum Emotions {
  Feliz = "feliz",
  Triste = "triste",
  Irritado = "irritado",
  Ansioso = "ansioso",
  Calmo = "calmo",
  Confuso = "confuso",
}

export const emotionOptions = [
  { icon: "😊", label: Emotions.Feliz },
  { icon: "😔", label: Emotions.Triste },
  { icon: "😠", label: Emotions.Irritado },
  { icon: "😰", label: Emotions.Ansioso },
  { icon: "😌", label: Emotions.Calmo },
  { icon: "🤔", label: Emotions.Confuso },
];

export const formSchema = z.object({
  emotions: z
    .array(
      z.enum([
        Emotions.Feliz,
        Emotions.Triste,
        Emotions.Irritado,
        Emotions.Ansioso,
        Emotions.Calmo,
        Emotions.Confuso,
      ])
    )
    .min(1, "Escolha pelo menos um humor"),
  title: z
    .string()
    .min(1, { message: "Informe um título" })
    .max(30, { message: "Título muito grande!" }),
  description: z
    .string()
    .min(4, { message: "Informe uma descrição" })
    .max(350, { message: "Descrição muito longa!" }),
  tags: z.array(z.string()).optional(),
});

export type FormDataDiaryRegister = z.infer<typeof formSchema>;