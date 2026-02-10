"use server"

import { orderService } from "@/services/order.service"
import { updateTag } from "next/cache"


export const updateSellerOderStatus=async function (id:string, status: string){

   try {
        const { data, error } = await orderService.updateSellerOrderStatus(id,status)
        if (!data) {
            return { data: null, error: { message: "Order status update failed due to server" } }
        }

        updateTag("sellerOrder")
        updateTag("sellerOrderDetails")

        return { data, error }
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "connection failed to server" } }
    }
}