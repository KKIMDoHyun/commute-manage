import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { signUpFormType } from "@/types/Auth";

export const PasswordInput = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<signUpFormType>();
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">비밀번호</span>
            <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                    <input
                        className={`flex w-full border-2 h-11 p-2 ${
                            errors.password?.message
                                ? "border-red-600"
                                : "border-neutral-500"
                        }`}
                        type="password"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        placeholder="비밀번호를 입력하세요."
                    />
                )}
                rules={{
                    required: {
                        value: true,
                        message: "* 비밀번호를 입력하세요.",
                    },
                    minLength: {
                        value: 4,
                        message: "* 비밀번호는 최소 4자리입니다.",
                    },
                    maxLength: {
                        value: 15,
                        message: "* 비밀번호는 최대 15자리입니다.",
                    },
                }}
            />
            {errors.password?.message && (
                <span className="text-xs text-red-600 font-semibold">
                    {errors.password.message}
                </span>
            )}
        </div>
    );
};
