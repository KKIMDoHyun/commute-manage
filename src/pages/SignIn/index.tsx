import React from "react";
import { useNavigate } from "react-router-dom";

import { TmaxLogo } from "@/components/TmaxLogo";

export const SignIn = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-10">
            <TmaxLogo />
            <div className="flex flex-col w-96 h-80 p-4 gap-3">
                <div className="flex flex-[3] flex-col w-full gap-3">
                    <input className="flex w-full h-1/4 border-2 border-black rounded-xl" />
                    <input className="flex w-full h-1/4 border-2 border-black rounded-xl" />
                    <button className="flex w-full h-1/3 items-center justify-center border-2 bg-[#666666] mt-4">
                        <span className="font-bold text-white">로그인</span>
                    </button>
                </div>
                <div className="flex flex-[0.5] flex-row w-full gap-3 items-center justify-center">
                    <input id="saveId" type="checkbox" className="scale-150" />
                    <label htmlFor="saveId">
                        <span className="text-lg">ID 저장</span>
                    </label>
                    <span className="text-lg">|</span>
                    <span
                        className="text-lg"
                        onClick={() => {
                            navigate("/sign-up");
                        }}
                    >
                        회원가입
                    </span>
                </div>
            </div>
        </div>
    );
};
