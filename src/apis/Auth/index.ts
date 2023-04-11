import { UseQueryOptions, useMutation } from "@tanstack/react-query";

import { AUTH_KEY } from "@/apis/Auth/keys";
import { signInInputDto, signUpInputDto } from "@/types/Auth";
import { apiClient } from "@/utils/api-client";

/**
 * 회원가입
 */
export const signUp = async (payload: signUpInputDto) => {
    return await apiClient.post("/auth/sign-up", payload);
    // return await axios.post("http://localhost:3000/auth/sign-up", payload);
};

export const useSignUp = (
    payload: signUpInputDto,
    options?: UseQueryOptions
) => {
    return useMutation(() => signUp(payload), {
        mutationKey: [AUTH_KEY.SIGN_UP],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};

/**
 * 로그인
 */
export const signIn = async (payload: signInInputDto) => {
    return await apiClient.post("/api/auth/sign-in", payload);
};

export const useSignIn = (
    payload: signInInputDto,
    options?: UseQueryOptions
) => {
    return useMutation(() => signIn(payload), {
        mutationKey: [AUTH_KEY.SIGN_IN],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};
