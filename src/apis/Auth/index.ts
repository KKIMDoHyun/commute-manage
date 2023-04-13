import { UseQueryOptions, useMutation } from "@tanstack/react-query";

import { AUTH_KEY } from "@/apis/Auth/keys";
import { signInInputDto, signUpInputDto } from "@/types/Auth";
import { instance } from "@/utils/axios-instance";

/**
 * 회원가입
 */
export const signUp = async (payload: signUpInputDto) => {
    return await instance.post("/auth/sign-up", payload);
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
    return await instance.post("/auth/sign-in", payload);
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
