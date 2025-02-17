export interface Responsible {
    id: number;
  }
  
  export interface Order {
    responsible: Responsible;
    clientCnpj: string;
    destination: string;
    status: string;
  }
  
  export interface Product {
    productId: number;
    quantity: number;
  }
  
  export interface OrderRequest {
    order: Order;
    products: Product[];
  }
  