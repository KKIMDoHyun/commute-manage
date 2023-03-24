import React from "react";

export const SignIn = () => {
    return (
        <div className="flex flex-1 flex-col w-full h-full items-center justify-center gap-10">
            <div className="flex">
                <img src="/public/Tmax.png" />
            </div>
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
                    <span className="text-lg">회원가입</span>
                </div>
            </div>
        </div>
    );
};
