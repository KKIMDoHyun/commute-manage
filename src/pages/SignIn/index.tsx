import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TmaxLogo } from "@/components/TmaxLogo";
import { EmailInput } from "@/pages/SignIn/EmailInput";
import { PasswordInput } from "@/pages/SignIn/PasswordInput";
import { SignInButton } from "@/pages/SignIn/SignInButton";
import { signInFormType } from "@/types/Auth";

export const SignIn = () => {
    const navigate = useNavigate();
    const methods = useForm<signInFormType>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-9">
            <TmaxLogo />
            <div className="flex flex-col w-80 items-center justify-center gap-3">
                <div className="flex flex-col w-full gap-2">
                    <FormProvider {...methods}>
                        <EmailInput />
                        <PasswordInput />
                        <SignInButton />
                    </FormProvider>
                </div>
                <div className="flex flex-row w-full gap-3 items-center justify-center">
                    <input id="saveId" type="checkbox" className="scale-150" />
                    <label htmlFor="saveId">
                        <span className="text-lg">ID 저장</span>
                    </label>
                    <span className="text-lg">|</span>
                    <button
                        className="text-lg"
                        onClick={() => {
                            navigate("/sign-up");
                        }}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};
