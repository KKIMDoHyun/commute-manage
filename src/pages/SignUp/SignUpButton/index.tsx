import React, { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { useSetAtom } from "jotai";

import { useSignUp } from "@/apis/Auth";
import { isSuccessSignUpAtom } from "@/stores/auth";
import { signUpInputDto } from "@/types/Auth";

export const SignUpButton = () => {
    const setIsSuccessSignUp = useSetAtom(isSuccessSignUpAtom);
    const { handleSubmit } = useFormContext<signUpInputDto>();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    const signUpMutation = useSignUp(
        { email: emailInput, password: passwordInput, name: nameInput },
        {
            onSuccess: () => {
                setIsSuccessSignUp(true);
            },
            onError: (err: any) => {
                console.log(err.response.data);
            },
        }
    );

    const onSubmit: SubmitHandler<signUpInputDto> = (data) => {
        const { email, password, name } = data;
        setEmailInput(email);
        setPasswordInput(password);
        setNameInput(name);
        signUpMutation.mutate();
    };
    return (
        <div className="w-full h-14 bg-slate-200 mt-2">
            <button
                className="flex w-full h-full items-center justify-center bg-[#666666]"
                onClick={handleSubmit(onSubmit)}
            >
                <span className="font-bold text-white">회원가입</span>
            </button>
        </div>
    );
};
