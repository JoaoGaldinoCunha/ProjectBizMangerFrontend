export interface Role {
    id: number;
    name: string;
  }
  
  export interface CompanyDetails2 {
    id: number;
    email: string;
    name: string;
    phone: string;
    password: string;
    cnpj: string;
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    number: string;
    role: Role;
  }
  