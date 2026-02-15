import { env } from "@/env"
import { cookies } from "next/headers";
import { userService } from "./user.service";

interface PostReviewPayload {
  content: string;
  rating: number;
}

const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL

export const reviewService = {
  isEligibleToReview: async (medicineId: string) => {
    try {
      const cookieStore = await cookies()


      const { data } = await userService.getSession()

      if (!data) {
        return { data: null, error: { message: "session not found" } }
      }


      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/reviews/${medicineId}/eligibility`,
        {
          headers: {
            cookie: cookieStore.toString(),
          },
          cache: "no-store",
        }
      )

      if (!res.ok) {
        return { data: null, error: { message: "server error" } }
      }

      const json = await res.json()

      return {
        data: json.data as { id: string; medicineId: string },
        error: null,
      }

    } catch {
      return { data: null, error: { message: "Server error" } }
    }
  },


  createNewReview: async (medicineId: string, payload: PostReviewPayload) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/reviews/${medicineId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString()
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        return { data: null, error: { message: "server error" } }
      }

      const json = await res.json()
      return { data: json.data, error: null }

    } catch {
      return { data: null, error: { message: "Internal server error" } }
    }
  }
}
