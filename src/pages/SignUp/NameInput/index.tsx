import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { signUpFormType } from "@/types/Auth";

export const NameInput = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<signUpFormType>();
    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">이름</span>
            <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                    <input
                        className={`flex w-full border-2 h-11 p-2 ${
                            errors.name?.message
                                ? "border-red-600"
                                : "border-neutral-500"
                        }`}
                        type="text"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        placeholder="이름을 입력하세요."
                    />
                )}
                rules={{
                    required: {
                        value: true,
                        message: "* 이름을 입력하세요.",
                    },
                }}
            />
            {errors.name?.message && (
                <span className="text-xs text-red-600 font-semibold">
                    {errors.name.message}
                </span>
            )}
        </div>
    );
};
