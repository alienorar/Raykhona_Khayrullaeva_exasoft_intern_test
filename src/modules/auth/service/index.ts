import axiosInstance from "@api";
import { SignIn } from "../types";
import { SignUp } from "../types";


// ==============Sign In ============
export async function signIn(data: SignIn) {
    return await axiosInstance.post("/auth/sign-in", data)
}

// ==============Sign up ==============
export async function signUp(data: SignUp) {
    return await axiosInstance.post("/auth/admin/sign-up", data)
}