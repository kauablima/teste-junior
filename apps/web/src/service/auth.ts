import { api } from './api';

interface LoginDTO {
    email: string;
    password: string;
}

export const login = async (data: LoginDTO): Promise<void> => {
    await api.post('/auth/login', data);
}

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
}