export interface EditProduct {
    name: string;
  description: string;
  stock: {
    id: number;
  };
  purchasePrice: number;
  expirationDate: string
}
