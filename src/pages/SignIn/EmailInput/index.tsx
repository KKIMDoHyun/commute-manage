import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { signInFormType } from "@/types/Auth";

export const EmailInput = () => {
    const { control } = useFormContext<signInFormType>();

    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold">이메일</span>
            <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                    <input
                        className="flex w-full border-[1px] border-neutral-500 rounded-xl h-14 p-2"
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
                }}
            />
        </div>
    );
};
