"use server";

import { reviewService } from "@/services/review.service";
import { revalidatePath } from "next/cache";

export const createComment = async (
    medicineId: string,
    payload: { rating: number; content: string }
) => {
    try {
        const { data, error } = await reviewService.createNewReview(
            medicineId,
            payload
        );
        if(!data){
            return { data: null, error: { message: "internal error" } }
        }

        revalidatePath(`/medicine/${medicineId}`)
        return { data, error };
    } catch (error) {
        console.error("Failed to create comment:", error);
        return { data: null, error: { message: "internal error" } }
    }
};
