export type OrderStatus =
  | "PLACED"
  | "CANCELLED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED";

export type OrderItem = {
  id: string;
  quantity: number;
  medicineRef: {
    id: string;
    title: string;
    price: string; // comes as string from DB
    manufacturer: string;
    categoryRef: {
      category_name: string;
    };
  };
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: string;
  orderItems: OrderItem[];
};
