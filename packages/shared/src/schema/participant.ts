import z from "zod";
import { isValidCpf } from "../lib/cpf";
import { isValidDate } from "../lib/birthDate";

export const createParticipantSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX').refine(isValidCpf, 'CPF inválido'),
    email: z.string().email('E-mail está inválido'),
    birthDate: z.string().refine(isValidDate, 'Data de nascimento inválida, deve estar no formato AAAA/MM/DD'),
    phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXX-XXXX'),
    teamId: z.string(),
    observations: z.string().max(500, 'Observações devem ter no máximo 500 caracteres').optional(),
})

export type CreateParticipantSchema = z.infer<typeof createParticipantSchema>    

export const participantResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    birthDate: z.string(),
    phone: z.string(),
    teamId: z.string(),
    observations: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type ParticipantResponseSchema = z.infer<typeof participantResponseSchema>