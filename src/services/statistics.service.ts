import { env } from "@/env"
import { ApiResponse } from "@/types"
import { AdminStatisticsData } from "@/types/adminStatics"
import { cookies } from "next/headers"








const API_URL = env.API_URL

export const statistics = {
    getAdminStatistics: async () => {
        try {
            const cookieStore = (await cookies()).toString()



            const res = await fetch(`${API_URL}/statistics/admin`, {
                headers: {
                    Cookie: cookieStore
                },
                cache: "no-store"
            })

            if (!res.ok) {
                return { data: null, error: { message: "server response break" } }
            }

            const data = (await res.json()) as ApiResponse<AdminStatisticsData>

            return { data, error: null }
        } catch (error: any) {
            return {
                data: null,
                error: error.message ?? "Unknown error"
            }
        }
    },




    getSellerStatistics: async () => {
        try {
            const cookieStore = await cookies()



            const res = await fetch(`${API_URL}/statistics/seller`, {
                headers: {
                    Cookie: cookieStore. toString()
                },
                cache: "no-store"
            })
            if (!res.ok) {
                return { data: null, error: { message: "server response break" } }
            }

            
            const data = await res.json()

            return { data, error: null }
        } catch (error: any) {
            return {
                data: null,
                error: error.message ?? "Unknown error"
            }
        }
    }
}
