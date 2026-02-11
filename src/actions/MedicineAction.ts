"use server";

import { CreateMedicinePayload, medicineService } from "@/services/medicine.service";
import { updateTag } from "next/cache";


export const addNewMedicineAction = async (payload: CreateMedicinePayload) => {
  try {

    const { data, error } = await medicineService.addNewMedicine(payload);

    if (!data) {
      return {
        data: null,
        error: { message: "Server error" },
      }
    }

    updateTag('medicine')

    return { data, error }

  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: { message: "Server error" },
    };
  }
};


export const updateMedicineAction = async (
  id: string,
  payload: Partial<CreateMedicinePayload>
) => {
  try {
    const { data, error } = await medicineService.updateMedicine(id, payload);

    if (!data) {
      return { data: null, error: { message: "medicine data update failed" } }
    }

    updateTag('medicine')

    return { data, error: null }

  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: { message: "Server error" },
    };
  }
}
  ;


export const deleteMedicineAction = async (id: string) => {
  try {
    const { data, error } = await medicineService.deleteMedicine(id);
    if (!data) {
      return { data: null, error: { message: "failed to deleteMedicine" } }
    }

    updateTag("medicine")
    return { data, error: null }

  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: { message: "Server error" },
    };
  }
}
