import z from "zod";

export const createTeamSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    serie: z.string(),
})

export type CreateTeamInput = z.infer<typeof createTeamSchema>

export const teamResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    state: z.string(),
    serie: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type TeamResponseSchema = z.infer<typeof teamResponseSchema>