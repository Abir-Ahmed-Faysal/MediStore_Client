import { env } from "@/env";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

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

export interface MedicineResponse {
  id: string;
  image: string;
  title: string;
  description: string;
  manufacturer: string;
  isFeatured: boolean;
  price: number | string;
  stock: number;
  sellerId: string;
  categoryId: string;
  categoryRef: CategoryRef;
  reviews: {
    id: string,
    userRef:{
      name: string;
    image: string;
    };
    content: string;
    rating: number;

  }[]
}







export interface MedicineListResponse {
  data: MedicineResponse[];
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
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
}


export interface CreateMedicinePayload {
  image: string;
  title: string;
  description: string;
  manufacturer: string;
  price: number
  stock: number | string;
  categoryId: string;
}


/* ==============================
   Service
================================ */

export const medicineService = {

  getAllMedicines: async (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) => {
    try {
      const url = new URL(`${NEXT_PUBLIC_API_URL}/medicines`);

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


  getMedicineById: async (id: string) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/medicines/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Medicine not found");
      }

      const json: ApiResponse<MedicineResponse> = await res.json();

      return { data: json.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },


  addNewMedicine: async (payload: CreateMedicinePayload) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/seller/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        return {
          data: null,
          error: { message: error?.message ?? "Server error" },
        };
      }


      const json: ApiResponse<MedicineResponse> = await res.json();
      return { data: json.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },






  updateMedicine: async (id: string, payload: Partial<CreateMedicinePayload>) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/seller/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        return {
          data: null,
          error: { message: error?.message ?? "Server error" },
        };
      }

      const json: ApiResponse<MedicineResponse> = await res.json();

      return { data: json.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: (error as Error).message },
      };
    }
  },


  deleteMedicine: async (id: string,) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/seller/medicines/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        return {
          data: null,
          error: { message: error?.message ?? "Server error" },
        };
      }

      const json: ApiResponse<MedicineResponse> = await res.json();

      return { data: json.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: (error as Error).message },
      };
    }
  }

};
