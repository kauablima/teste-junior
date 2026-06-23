import { api } from './api';
import type { TeamResponseSchema, CreateTeamInput } from '@teste-junior/shared';

export type { CreateTeamInput as CreateTeamDTO };

export interface UpdateTeamDTO extends Partial<CreateTeamInput> { }

export async function getTeams(page = 1, limit = 10): Promise<TeamResponseSchema[]> {
    const response = await api.get<TeamResponseSchema[]>('/teams', {
        params: { page, limit },
    });
    return response.data;
}

export async function createTeam(data: CreateTeamInput): Promise<TeamResponseSchema> {
    const response = await api.post<TeamResponseSchema>('/teams', data);
    return response.data;
}

export async function updateTeam(id: string, data: UpdateTeamDTO): Promise<TeamResponseSchema> {
    const response = await api.patch<TeamResponseSchema>(`/teams/${id}`, data);
    return response.data;
}

export async function deleteTeam(id: string): Promise<void> {
    await api.delete(`/teams/${id}`);
}