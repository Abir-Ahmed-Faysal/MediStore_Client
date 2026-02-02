import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export async function postOrder(payload: {
  address: string;
  items: { medicineId: string; quantity: number }[];
}) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(), 
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  return res.json();
}
