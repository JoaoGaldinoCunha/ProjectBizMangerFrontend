export interface TbStock {
    id?: number;
    name: string;
    responsible: {
      id: number;
    };
    maxCapacity: number;
    stockType: string;
    company: {
      id: number;
    };
    createdAt: string;
  }
  


