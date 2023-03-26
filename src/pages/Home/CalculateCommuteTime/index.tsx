import React from "react";

import { useAtomValue } from "jotai";

import { weekWorkTimeAtom } from "@/stores/commute";

export const CalculateCommuteTime = () => {
    const weekWorkTime = useAtomValue(weekWorkTimeAtom);
    const remainTime = 2400 - weekWorkTime;
    return (
        <div className="flex flex-[0.8] flex-col justify-center items-center w-full gap-4">
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold">
                    이번 주 업무 시간: {Math.floor(weekWorkTime / 60)}시간{" "}
                    {Math.floor(weekWorkTime % 60)}분
                </span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold">
                    이번 주 남은 시간:{" "}
                    {remainTime > 0
                        ? `${Math.floor(remainTime / 60)}시간 ${Math.floor(
                              remainTime % 60
                          )}분`
                        : 0}
                </span>
                {remainTime <= 0 && (
                    <span className="text-sm font-bold text-red-500 mt-1">
                        {`${Math.floor(
                            (-1 * remainTime) / 60
                        )}시간 ${Math.floor((-1 * remainTime) % 60)}분`}
                        이 초과되었습니다.
                    </span>
                )}
            </div>
        </div>
    );
};
