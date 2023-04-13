import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { signInFormType } from "@/types/Auth";

export const PasswordInput = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<signInFormType>();
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">비밀번호</span>
            <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                    <input
                        className="flex w-full border-[1px] border-neutral-500 rounded-xl h-14 p-2"
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
