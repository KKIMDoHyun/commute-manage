import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { TmaxLogo } from "@/components/TmaxLogo";
import { EmailInput } from "@/pages/SignUp/EmailInput";
import { NameInput } from "@/pages/SignUp/NameInput";
import { PasswordInput } from "@/pages/SignUp/PasswordInput";
import { RePasswordInput } from "@/pages/SignUp/RePasswordInput";
import { SignUpButton } from "@/pages/SignUp/SignUpButton";
import { signUpFormType } from "@/types/Auth";

export const SignUp = () => {
    const methods = useForm<signUpFormType>({
        defaultValues: {
            email: "",
            password: "",
            rePassword: "",
            name: "",
        },
    });

    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-7">
            <TmaxLogo />
            <div className="flex flex-col w-[21rem] border-2 border-neutral-500 p-3">
                <div className="flex flex-col w-full gap-2">
                    <FormProvider {...methods}>
                        <EmailInput />
                        <PasswordInput />
                        <RePasswordInput />
                        <NameInput />
                        <SignUpButton />
                    </FormProvider>
                </div>
                <div className="flex w-full mt-2 justify-center items-center">
                    <span className="text-sm text-red-600 font-semibold">
                        {/* {errorMessage} */}
                    </span>
                </div>
            </div>
            <button>
                <span className="font-bold text-sm">로그인하러 가기</span>
            </button>
        </div>
    );
};
