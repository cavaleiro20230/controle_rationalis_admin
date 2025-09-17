
export enum Role {
  Superintendente = 'Superintendente',
  Gerente = 'Gerente',
  Coordenador = 'Coordenador',
  Colaborador = 'Colaborador',
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  forcePasswordChange: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  targetUsername: string;
  timestamp: string;
}
