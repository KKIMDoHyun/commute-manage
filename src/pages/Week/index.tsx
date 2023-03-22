import React from "react";

import { ChangeWeek } from "@/pages/Week/ChangeWeek";
import { Record } from "@/pages/Week/Record";

export const Week = () => {
    return (
        <div className="flex flex-col w-full h-full items-center p-4 gap-3">
            <div className="flex flex-[0.7] w-full items-center justify-center">
                <span className="font-bold text-lg">주간 기록 확인</span>
            </div>
            <ChangeWeek />
            <Record />
        </div>
    );
};
