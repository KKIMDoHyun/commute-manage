import React from "react";

export const CalculateCommuteTime = () => {
    return (
        <div className="flex flex-col w-5/6 h-1/6 bg-slate-400 items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center">
                <span>이번 주 업무 시간: @@시간</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <span>이번 주 남은 시간: @@시간</span>
            </div>
        </div>
    );
};
