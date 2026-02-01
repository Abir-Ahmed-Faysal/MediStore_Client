"use server";

import { medicineService } from "@/services/medicine.service";

export const getBlogs = async () => {
  return await medicineService.getBlogPosts();
};
