"use server"

import { UpdateUserPayload, userService } from "@/services/user.service"

export const updateUser = async (payload: UpdateUserPayload) => {

    try {
        const { data, error } = await userService.updateUserData(payload)
        if (!data) {
            return { data: null, error: { message: "connection failed to server" } }
        }

        return { data, error }
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "connection failed to server" } }
    }
}
