import React from "react";

import { useAtom } from "jotai";

import { ArrowBeforeIcon, ArrowNextIcon } from "@/assets/Icons";
import { getWeek, mondayDateAtom } from "@/stores/week-record";

export const ChangeWeek = () => {
    const [mondayDate, setMondayDate] = useAtom(mondayDateAtom);

    return (
        <div className="flex flex-[1] flex-col w-full justify-center items-center gap-1">
            <div className="flex gap-5 justify-center items-center">
                <button
                    className="flex"
                    onClick={() => {
                        setMondayDate(mondayDate.add(-1, "week"));
                    }}
                >
                    <ArrowBeforeIcon width={20} height={20} />
                </button>
                <span>{`${mondayDate.get("month") + 1}월 ${getWeek(
                    mondayDate
                )}째주`}</span>
                <button
                    onClick={() => {
                        setMondayDate(mondayDate.add(1, "week"));
                    }}
                >
                    <ArrowNextIcon width={20} height={20} />
                </button>
            </div>
            <span className="font-bold">{`${mondayDate.format(
                "YYYY-MM-DD"
            )} ~ ${mondayDate.add(4, "day").format("YYYY-MM-DD")}`}</span>
        </div>
    );
};
