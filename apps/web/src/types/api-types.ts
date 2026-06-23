export interface Team {
  id: string;
  name: string;
  state: string;  
  division: string;  
}

export interface Participant {
  id: string;
  fullName: string;
  cpf: string;
  email: string;
  birthDate: string;
  phone: string;
  team: Team;
  observations?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

