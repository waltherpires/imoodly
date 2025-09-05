import { z } from "zod";

export const formSchema = z.object({
    entityType: z.enum(['post', 'goal']),
    entityId: z.number(),
    content: z.string().min(1, 'O comentário não pode estar vazio.').max(550, 'Limite de 550 caracteres ultrapassado'),
    parentId: z.number().optional(),
});

export type FormSchema = z.infer<typeof formSchema>