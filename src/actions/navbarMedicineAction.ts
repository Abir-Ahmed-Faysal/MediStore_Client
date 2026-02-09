"use server";

import { medicineService } from "@/services/medicine.service";
import { MedicineListResponse } from "@/services/medicine.service";

interface SearchMedicineParams {
  search: string;
}

export const searchMedicine = async ({
  search,
}: SearchMedicineParams): Promise<MedicineListResponse | null> => {
  const { data, error } = await medicineService.getAllMedicines({
    search,
  });

  if (error) {
    console.error("Search medicine failed:", error.message);
    return null;
  }

  return data;
};
