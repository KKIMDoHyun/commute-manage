import React from "react";

import { useAtom } from "jotai";

import {
    emailAtom,
    nameAtom,
    passwordAtom,
    rePasswordAtom,
} from "@/stores/sign-up";

export type TLabel = "email" | "password" | "rePassword" | "name";

type TInput = {
    label: TLabel;
};

export const Input = ({ label }: TInput) => {
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [rePassword, setRePassword] = useAtom(rePasswordAtom);
    const [name, setName] = useAtom(nameAtom);

    const handleInput = (text: string) => {
        if (label === "email") setEmail(text);
        if (label === "password") setPassword(text);
        if (label === "rePassword") setRePassword(text);
        if (label === "name") setName(text);
    };

    return (
        <div className="flex flex-col flex-1 w-full">
            <label htmlFor={label}>
                {label === "email" && "이메일"}
                {label === "password" && "비밀번호"}
                {label === "rePassword" && "비밀번호 재입력"}
                {label === "name" && "이름"}
            </label>
            <input
                id={label}
                className="flex w-full border-2 h-11 border-neutral-400 rounded-xl p-3"
                placeholder={
                    label === "email"
                        ? "이메일을 입력하세요."
                        : label === "password"
                        ? "비밀번호를 입력하세요."
                        : label === "rePassword"
                        ? "비밀번호를 재입력하세요."
                        : "이름을 입력하세요."
                }
                type={
                    label === "email"
                        ? "email"
                        : label === "name"
                        ? "text"
                        : "password"
                }
                value={
                    label === "email"
                        ? email
                        : label === "password"
                        ? password
                        : label === "rePassword"
                        ? rePassword
                        : name
                }
                onChange={(e) => handleInput(e.target.value)}
            />
        </div>
    );
};
