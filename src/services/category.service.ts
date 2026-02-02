import { env } from "@/env";

const API_URL = env.API_URL;

export const categoryServices = {
  getCategories: async () => {
    const res = await fetch(`${API_URL}/categories`, {
      
      next: { revalidate: 10 }, 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    return data;
  },
};
