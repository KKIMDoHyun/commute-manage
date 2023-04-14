import React, { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { useSignIn } from "@/apis/Auth";
import { signInFormType, signUpInputDto } from "@/types/Auth";
import { getCookies } from "@/utils/Cookies";

export const SignInButton = () => {
    const { handleSubmit } = useFormContext<signUpInputDto>();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signInMutation = useSignIn(
        { email: emailInput, password: passwordInput },
        {
            onSuccess: (res: any) => {
                console.log(res.data);
                // setCookies("Authorization", `Bearer ${res.data.accessToken}`, {
                //     path: "/",
                //     sameSite: "none",
                //     secure: true,
                // });
                console.log(getCookies("Authorization"));
                // console.log(getCookies("Refresh"));
                // console.log(getCookies("Authentication"));
            },
            onError: (err: any) => {
                setErrorMessage(err.response.data.message);
                console.log(err.response.data);
            },
        }
    );

    const onSubmit: SubmitHandler<signInFormType> = (data) => {
        const { email, password } = data;
        setEmailInput(email);
        setPasswordInput(password);
        signInMutation.mutate();
    };

    useEffect(() => {
        setErrorMessage("");
    }, []);

    return (
        <div className="flex flex-col w-full justify-between">
            <div className="flex h-4 mb-2 items-center justify-center">
                <span className="text-red-500 font-bold text-sm">
                    {errorMessage}
                </span>
            </div>
            <button
                className="flex w-full h-20 justify-center items-center bg-[#666666]"
                onClick={handleSubmit(onSubmit)}
            >
                <span className="font-bold text-white text-lg">로그인</span>
            </button>
        </div>
    );
};
