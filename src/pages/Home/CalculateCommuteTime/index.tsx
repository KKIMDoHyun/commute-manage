import React from "react";

import { useAtomValue } from "jotai";

import { weekWorkTimeAtom } from "../../../stores";

export const CalculateCommuteTime = () => {
    const weekWorkTime = useAtomValue(weekWorkTimeAtom);
    const remainTime = 2400 - weekWorkTime;
    return (
        <div className="flex flex-col justify-evenly items-center w-full h-full">
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold">
                    이번 주 업무 시간: {Math.floor(weekWorkTime / 60)}시간{" "}
                    {Math.floor(weekWorkTime % 60)}분
                </span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold">
                    이번 주 남은 시간: {Math.floor(remainTime / 60)}시간{" "}
                    {Math.floor(remainTime % 60)}분
                </span>
            </div>
        </div>
    );
};
