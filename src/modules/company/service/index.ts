import axiosInstance from "@api";
import { ParamsType } from "@types";
import { CategoryType } from "../types";

// ===============GET CATEGORY=============
export async function getCategory(params: ParamsType) {
    return await axiosInstance.get("api/companies/get-all", { params });
}

// ===============CREATE CATEGORY=============
export async function createCategory(data: CategoryType) {
    return await axiosInstance.post("api/companies/add", data);
}

// ===============UPDATE CATEGORY=============
export async function updateCategory(data: CategoryType) {
    const formattedData = {
        ...data,
        count: Number(data?.count) 
    };
    return await axiosInstance.put("api/companies/update", formattedData);

}

// ===============DELETE CATEGORY=============
export async function deleteCategory(id:CategoryType) {
    return await axiosInstance.delete("api/companies/delete/by-id", {
        data: { id }  
    });
}


