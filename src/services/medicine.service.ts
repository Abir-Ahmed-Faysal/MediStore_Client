import { env } from "@/env";

const API_URL = env.API_URL;

/* ==============================
   Types
================================ */

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface CategoryRef {
  id: string;
  category_name: string;
}

export interface Medicine {
  id: string;
  title: string;
  description: string;
  manufacturer: string;
  price: string;
  stock: number;
  sellerId: string;
  categoryId: string;
  categoryRef: CategoryRef;
}

export interface MedicineListResponse {
  data: Medicine[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface GetMedicinesParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/* ==============================
   Service
================================ */

export const medicineService = {
  
  async getAllMedicines(
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
        cache: options?.cache,
        next: options?.revalidate
          ? { revalidate: options.revalidate }
          : undefined,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const json: ApiResponse<MedicineListResponse> = await res.json();

      return { data: json.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },

  
  async getMedicineById(id: string) {
    try {

    

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medicines/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Medicine not found");
      }

      const json: ApiResponse<Medicine> = await res.json();

      return { data: json.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },
};
