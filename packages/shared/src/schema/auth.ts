import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail está inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type LoginType = z.infer<typeof loginSchema>  