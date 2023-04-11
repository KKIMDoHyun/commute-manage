import React from "react";

import { useAtom, useAtomValue } from "jotai";

import { useSignUp } from "@/apis/Auth";
import { TmaxLogo } from "@/components/TmaxLogo";
import { Input } from "@/pages/SignUp/Input";
import {
    emailAtom,
    errorMessageAtom,
    nameAtom,
    passwordAtom,
    rePasswordAtom,
} from "@/stores/sign-up";
import { EmailRegex } from "@/utils/regex";

export const SignUp = () => {
    const email = useAtomValue(emailAtom);
    const password = useAtomValue(passwordAtom);
    const rePassword = useAtomValue(rePasswordAtom);
    const name = useAtomValue(nameAtom);
    const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

    const signUpMutation = useSignUp({ email, password, name });

    const handleSignUp = () => {
        setErrorMessage("");
        if (password !== rePassword) {
            setErrorMessage("두 비밀번호가 일치하지 않습니다.");
        }
        if (password.length < 4) {
            setErrorMessage("비밀번호는 6글자 이상이어야 합니다.");
            if (password.length === 0) {
                setErrorMessage("비밀번호를 입력해주세요.");
            }
        }
        if (!EmailRegex.test(email)) {
            setErrorMessage("이메일 형식이 옳바르지 않습니다.");
        } else if (errorMessage === "") {
            signUpMutation.mutate();
        }
    };
    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-7">
            <TmaxLogo />
            <div className="flex flex-col w-[21rem] border-2 border-neutral-500 p-3">
                <div className="flex flex-col w-full gap-2">
                    <Input label="email" />
                    <Input label="password" />
                    <Input label="rePassword" />
                    <Input label="name" />
                </div>
                <div className="flex w-full mt-2 justify-center items-center">
                    <span className="text-sm text-red-600 font-semibold">
                        {errorMessage}
                    </span>
                </div>
                <div className="w-full h-14 bg-slate-200 mt-2">
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
