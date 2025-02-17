export interface TbEmployees {
    name: string;
    birthDate: string;
    email: string;
    password: string;
    cpf: string;
    company: {
      id: number;
    };
    role: {
      id: number;
    };
  }
  