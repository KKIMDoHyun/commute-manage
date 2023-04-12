import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { signUpFormType } from "@/types/Auth";

export const RePasswordInput = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<signUpFormType>();
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">비밀번호 재입력</span>
            <Controller
                control={control}
                name="rePassword"
                render={({ field: { value, onChange } }) => (
                    <input
                        className={`flex w-full border-2 h-11 p-2 ${
                            errors.rePassword?.message
                                ? "border-red-600"
                                : "border-neutral-500"
                        }`}
                        type="password"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        placeholder="비밀번호를 재입력하세요."
                    />
                )}
                rules={{
                    required: {
                        value: true,
                        message: "* 비밀번호를 재입력하세요.",
                    },
                    validate: (value, formValue) =>
                        value === formValue.password || "*비밀번호와 다릅니다.",
                }}
            />
            {errors.rePassword?.message && (
                <span className="text-xs text-red-600 font-semibold">
                    {errors.rePassword.message}
                </span>
            )}
        </div>
    );
};
