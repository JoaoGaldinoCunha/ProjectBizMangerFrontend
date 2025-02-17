export interface AdminOrCompanyEditEmployee {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  company: {
    id: number;
  };
  role: {
    id: number;
  };
  password: string;
}
