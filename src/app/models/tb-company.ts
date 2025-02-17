export interface TbCompany {
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
    complement?: string; 
    number: string;
    role: TbRoles;
}

export interface TbRoles {
    id: number;
    name: string;
}
