// types/order.ts

export type OrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED";

export interface UserRef {
  name: string;
  email: string;
  phone: string | null;
}

export interface MedicineRef {
  id: string;
  title: string;
  manufacturer: string;
  price: string; 
}

export interface OrderItem {
  quantity: number;
  medicineRef: MedicineRef;
}

export interface Order {
  id: string;
  address: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: string;
  userRef: UserRef;
  orderItems: OrderItem[];
}



export interface SingleApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

