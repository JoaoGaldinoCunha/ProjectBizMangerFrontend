export interface EditEmployees {
    name: string;
    birthDate: string;
    email: string;
    cpf: string;
    company: {
      id: number;
    };
    role: {
      id: number;
    };
    password: string;
    oldPassword: string;
  }
  