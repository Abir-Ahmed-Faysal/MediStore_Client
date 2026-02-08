import { env } from "@/env";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types";
import { Category, CreateCategoryPayload, ServiceResult, UpdateCategoryPayload } from "@/types/category.type";

const API_URL = env.API_URL;


export const categoryServices = {
  /* -------- GET all categories -------- */
  async getCategories(): Promise<ServiceResult<Category[]>> {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        next: { revalidate: 10 },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch categories" } };
      }

      const json: ApiResponse<Category[]> = await res.json();
      return { data: json.data, error: null };
    } catch (error) {
      console.error("getCategories:", error);
      return { data: null, error: { message: "Internal server error" } };
    }
  },

  /* -------- POST create category (Admin) -------- */
  async createCategory(
    payload: CreateCategoryPayload
  ): Promise<ServiceResult<Category>> {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to create category" } };
      }

      const json: ApiResponse<Category> = await res.json();
      return { data: json.data, error: null };
    } catch (error) {
      console.error("createCategory:", error);
      return { data: null, error: { message: "Internal server error" } };
    }
  },

  /* -------- PATCH update category (Admin) -------- */
  async updateCategory(
    id: string,
    payload: UpdateCategoryPayload
  ): Promise<ServiceResult<Category>> {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to update category" } };
      }

      const json: ApiResponse<Category> = await res.json();
      return { data: json.data, error: null };
    } catch (error) {
      console.error("updateCategory:", error);
      return { data: null, error: { message: "Internal server error" } };
    }
  },

  /* -------- DELETE category (Admin) -------- */
  async deleteCategory(id: string): Promise<ServiceResult<null>> {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to delete category" } };
      }

      return { data: null, error: null };
    } catch (error) {
      console.error("deleteCategory:", error);
      return { data: null, error: { message: "Internal server error" } };
    }
  },
};
