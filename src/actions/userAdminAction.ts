"use server"

import { userService } from "@/services/user.service"


export const banUserAction = async (id: string) => {

    try {
        const { data, error } = await userService.banUser(id)

        if (!data) {
            return { data: null, error: { message: "internal server error" } }
        }

        return { data, error }

    } catch (error) {
        return { data: null, error: { message: "internal server error" } }
    }
}



export const unBanAction = async (id: string) => {
    try {
        const { data, error } = await userService.UnBanUser(id)

        if (!data) {
            return { data: null, error: { message: "internal server error" } }
        }

        return { data, error }

    } catch (error) {
        return { data: null, error: { message: "internal server error" } }
    }
}
