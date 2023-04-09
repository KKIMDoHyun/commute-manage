import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { AUTH_KEY } from "@/apis/Auth/keys";
import { signInInputDto, signUpInputDto } from "@/types/Auth";
import { apiClient } from "@/utils/api-client";

/**
 * 회원가입
 */
export const signUp = async (payload: signUpInputDto) => {
    return await apiClient.post("/api/auth/sign-up", payload);
};

export const useSignUp = (
    payload: signUpInputDto,
    options?: UseQueryOptions
) => {
    return useQuery([AUTH_KEY.SIGN_UP], () => signUp(payload), {
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
        enabled: !!options?.enabled,
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
    return useQuery([AUTH_KEY.SIGN_IN], () => signIn(payload), {
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
        enabled: !!options?.enabled,
    });
};
