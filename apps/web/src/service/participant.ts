import type { CreateParticipantInput, ParticipantResponseSchema } from '@teste-junior/shared';
import { api } from './api';
import type { PaginatedResponse } from '@/types/api-types';

export async function createParticipant(data: CreateParticipantInput): Promise<ParticipantResponseSchema> {
    const response = await api.post<ParticipantResponseSchema>('/participants', data);
    return response.data;
}

export async function getParticipants(search?: string, page = 1, limit = 10): Promise<PaginatedResponse<ParticipantResponseSchema>> {
    const response = await api.get<PaginatedResponse<ParticipantResponseSchema>>('/participants', {
        params: {
            ...(search ? { search } : {}),
            page,
            limit
        },
    });

    return response.data;
}

export async function getParticipantById(id: string): Promise<ParticipantResponseSchema> {
    const response = await api.get<ParticipantResponseSchema>(`/participants/${id}`);

    return response.data;
}