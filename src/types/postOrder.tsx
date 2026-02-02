export interface OrderPayload {
  address: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
}
