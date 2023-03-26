import React from "react";

import { useAtomValue } from "jotai";

import { TmaxLogo } from "@/components/TmaxLogo";
import { Input } from "@/pages/SignUp/Input";
import { emailAtom, passwordAtom, rePasswordAtom } from "@/stores/sign-up";

export const SignUp = () => {
    const email = useAtomValue(emailAtom);
    const password = useAtomValue(passwordAtom);
    const rePassword = useAtomValue(rePasswordAtom);

    const handleSignUp = () => {
        console.log(email, password, rePassword);
    };
    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-10">
            <TmaxLogo />
            <div className="flex flex-col w-96 h-96 p-4 border-2 border-neutral-500">
                <div className="flex flex-1 flex-col w-full">
                    <Input label="email" />
                    <Input label="password" />
                    <Input label="rePassword" />
                </div>
                <button
                    className="flex w-full h-1/5 items-center justify-center border-2 bg-[#666666] mt-4"
                    onClick={handleSignUp}
                >
                    <span className="font-bold text-white">회원가입</span>
                </button>
            </div>
        </div>
    );
};
