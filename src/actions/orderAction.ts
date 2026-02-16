"use server";

import { revalidateTag } from "next/cache";
import { postOrder } from "@/services/order.service";

export async function createOrderAction(payload: {
  address: string;
  items: { medicineId: string; quantity: number }[];
}) {
  try {
    const { data, error } = await postOrder(payload);

    if (!data) {
      return { data: null, error }
    }


    revalidateTag("medicines", 'max');

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "internal error" };
  }
}
