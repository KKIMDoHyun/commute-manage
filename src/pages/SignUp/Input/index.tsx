import React from "react";

import { useAtom } from "jotai";

import { emailAtom, passwordAtom, rePasswordAtom } from "@/stores/sign-up";

export type TLabel = "email" | "password" | "rePassword";

type TInput = {
    label: TLabel;
};

export const Input = ({ label }: TInput) => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [rePassword, setRePassword] = useAtom(rePasswordAtom);

    const handleInput = (text: string) => {
        if (label === "email") setEmail(text);
        if (label === "password") setPassword(text);
        if (label === "rePassword") setRePassword(text);
    };

    return (
        <div className="flex flex-col flex-1 w-full">
            <label htmlFor={label}>
                {label === "email" && "이메일"}
                {label === "password" && "비밀번호"}
                {label === "rePassword" && "비밀번호 재입력"}
            </label>
            <input
                id={label}
                className="flex w-full border-2 h-11 border-neutral-400 rounded-xl p-3"
                placeholder={
                    label === "email"
                        ? "이메일을 입력하세요."
                        : label === "password"
                        ? "비밀번호를 입력하세요."
                        : "비밀번호를 재입력하세요."
                }
                type={label === "email" ? "email" : "password"}
                value={
                    label === "email"
                        ? email
                        : label === "password"
                        ? password
                        : rePassword
                }
                onChange={(e) => handleInput(e.target.value)}
            />
        </div>
    );
};
