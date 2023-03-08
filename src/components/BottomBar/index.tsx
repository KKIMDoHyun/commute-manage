import React from "react";

export const BottomBar = () => {
    return (
        <div className="flex w-full h-24 bg-slate-700 items-center">
            <button className="flex w-full h-full justify-center items-center bg-slate-400">
                홈
            </button>
            <button className="flex w-full h-full justify-center items-center">
                주간보기
            </button>
        </div>
    );
};
