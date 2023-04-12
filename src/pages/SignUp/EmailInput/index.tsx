import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { signUpFormType } from "@/types/Auth";
import { EmailRegex } from "@/utils/regex";

export const EmailInput = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<signUpFormType>();

    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">이메일</span>
            <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                    <input
                        className={`flex w-full border-2 h-11 p-2 ${
                            errors.email?.message
                                ? "border-red-600"
                                : "border-neutral-500"
                        }`}
                        type="email"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        placeholder="이메일을 입력하세요."
                    />
                )}
                rules={{
                    required: {
                        value: true,
                        message: "* 이메일을 입력하세요.",
                    },
                    pattern: {
                        value: EmailRegex,
                        message: "* 이메일 형식이 잘못되었습니다.",
                    },
                }}
            />
            {errors.email?.message && (
                <span className="text-xs text-red-600 font-semibold">
                    {errors.email.message}
                </span>
            )}
        </div>
    );
};
