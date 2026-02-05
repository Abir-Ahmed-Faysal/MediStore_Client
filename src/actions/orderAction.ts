"use server";

import { revalidateTag } from "next/cache";
import { postOrder } from "@/services/order.service";

export async function createOrderAction(payload: {
  address: string;
  items: { medicineId: string; quantity: number }[];
}) {
  try {
    const result = await postOrder(payload);

    
    revalidateTag("medicines",'max');

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
