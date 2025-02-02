import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../service";
import { SignIn, SignUp } from "../types";
import { openNotification } from "@utils";
import { saveAccesToken } from "../../../utils/token-service";


export function useSignInMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: SignIn) => signIn(data),
        onSuccess: (response: any) => {
            openNotification('success', "Success", response?.data?.message);
            const token = response?.data;
            saveAccesToken(token);
            navigate("/company");
        },
        onError: (error: any) => {
            openNotification('error', "Error", error.data?.message,)

        }

    })
}
export function useSignUpMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: SignUp) => signUp(data),
        onSuccess: () => {
            navigate("/");
        },
        onError: (error: any) => {
            openNotification('error', "Invalid username or password", error.data?.message,)

        }

    })
}