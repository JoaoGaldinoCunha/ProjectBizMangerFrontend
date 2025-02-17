export interface TbProduct {
    id?: number;
    name: string;
    description: string;
    category: string;
    expirationDate: Date;
    purchasePrice: number;
    quantity: number;
    stock: {
      id: number;
    };
  }
  