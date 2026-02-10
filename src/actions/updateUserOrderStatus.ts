"use server"

"use server"

import { orderService } from "@/services/order.service"
import { updateTag } from "next/cache"




export const updateUserOrderStatus = async (id: string) => {

    try {
        const { data, error } = await orderService.updateUserOrderStatus(id)
        if (!data) {
            return { data: null, error: { message: "Order status update failed due to server" } }
        }

        updateTag("userOrder")
        updateTag("userOrderDetails")

        return { data, error }
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "connection failed to server" } }
    }
}
