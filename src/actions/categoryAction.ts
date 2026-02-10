"use server"

import { categoryServices } from "@/services/category.service"
import { Category, CreateCategoryPayload } from "@/types/category.type"
import { updateTag } from "next/cache"


export const categoryAction = {

    AddNewCategory: async (payload: CreateCategoryPayload) => {
        try {
            const { data, error } = await categoryServices.createCategory(payload)
            if (!data) {
                return { data: null, error: "server error" }
            }
            updateTag("categories")
            updateTag("singleCategory")
            return { data, error }

        } catch (error) {
            return { data: null, error: "server error" }
        }
    }
    ,

    updateNewCategory: async (id: string, payload: Partial<Category>) => {

        try {
            const { data, error } = await categoryServices.updateCategory(id, payload)
            if (!data) {
                return { data: null, error: "server error" }
            }
            updateTag("categories")
            updateTag("singleCategory")
            return { data, error }
        } catch (error) {
            return { data: null, error: "server error" }
        }


    },


    deleteCategory: async (id: string) => {
        try {
            const { data, error } = await categoryServices.deleteCategory(id)
            if (!data) {
                return { data: null, error: "server error" }
            }
            updateTag("categories")
            updateTag("singleCategory")
            return { data, error }
        } catch (error) {
            return { data: null, error: "server error" }
        }
    }


















}