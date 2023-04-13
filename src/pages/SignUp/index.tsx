import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";

import { TmaxLogo } from "@/components/TmaxLogo";
import { EmailInput } from "@/pages/SignUp/EmailInput";
import { NameInput } from "@/pages/SignUp/NameInput";
import { PasswordInput } from "@/pages/SignUp/PasswordInput";
import { RePasswordInput } from "@/pages/SignUp/RePasswordInput";
import { SignUpButton } from "@/pages/SignUp/SignUpButton";
import { isSuccessSignUpAtom } from "@/stores/auth";
import { signUpFormType } from "@/types/Auth";

export const SignUp = () => {
    const navigate = useNavigate();
    const [isSuccessSignUp, setIsSuccessSignUp] = useAtom(isSuccessSignUpAtom);
    const methods = useForm<signUpFormType>({
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
            name: "",
        },
    });

    useEffect(() => {
        setIsSuccessSignUp(false);
    }, []);

    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-7">
            <TmaxLogo />
            <div className="flex flex-col w-[21rem] border-2 border-neutral-500 p-3 gap-2">
                <FormProvider {...methods}>
                    <EmailInput />
                    <PasswordInput />
                    <RePasswordInput />
                    <NameInput />
                    <SignUpButton />
                </FormProvider>
            </div>
            <button
                onClick={() => {
                    navigate("/sign-in");
                }}
            >
                <span className="font-bold text-sm">로그인하러 가기</span>
            </button>
            {isSuccessSignUp && (
                <div className="flex flex-col absolute border-2 border-black w-64 h-60 bg-white justify-center items-center gap-1">
                    <span>회원가입에 성공하셨습니다!</span>
                    <span>로그인으로 GO</span>
                    <button
                        className="flex border-[1px] mt-8 w-24 h-8 justify-center items-center bg-sky-500 text-white"
                        onClick={() => {
                            setIsSuccessSignUp(false);
                            navigate("/sign-in");
                        }}
                    >
                        확인
                    </button>
                </div>
            )}
        </div>
    );
};
