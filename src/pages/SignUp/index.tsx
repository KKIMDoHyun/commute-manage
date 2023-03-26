import React from "react";

import { useAtom, useAtomValue } from "jotai";

import { TmaxLogo } from "@/components/TmaxLogo";
import { Input } from "@/pages/SignUp/Input";
import {
    emailAtom,
    errorMessageAtom,
    passwordAtom,
    rePasswordAtom,
} from "@/stores/sign-up";
import { EmailRegex } from "@/utils/regex";

export const SignUp = () => {
    const email = useAtomValue(emailAtom);
    const password = useAtomValue(passwordAtom);
    const rePassword = useAtomValue(rePasswordAtom);
    const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

    const handleSignUp = () => {
        if (password !== rePassword) {
            setErrorMessage("두 비밀번호가 일치하지 않습니다.");
        }
        if (password.length < 4) {
            setErrorMessage("비밀번호는 4글자 이상이어야 합니다.");
        }
        if (!EmailRegex.test(email)) {
            setErrorMessage("이메일 형식이 옳바르지 않습니다.");
        }
    };
    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-10">
            <TmaxLogo />
            <div className="flex flex-col w-[21rem] h-[22rem] p-3 border-2 border-neutral-500 gap-1 justify-center items-center">
                <div className="flex flex-col w-full h-2/3 gap-1">
                    <Input label="email" />
                    <Input label="password" />
                    <Input label="rePassword" />
                </div>
                <div className="flex w-full h-5 items-center">
                    <span className="text-sm text-red-600 font-semibold">
                        {errorMessage}
                    </span>
                </div>
                <div className="w-full h-1/5 bg-slate-200">
                    <button
                        className="flex w-full h-full items-center justify-center bg-[#666666]"
                        onClick={handleSignUp}
                    >
                        <span className="font-bold text-white">회원가입</span>
                    </button>
                </div>
            </div>
            <button>
                <span className="font-bold text-sm">로그인하러 가기</span>
            </button>
        </div>
    );
};
