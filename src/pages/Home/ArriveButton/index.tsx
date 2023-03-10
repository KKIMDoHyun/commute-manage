import React from "react";

import { useSetArriveTime } from "../../../apis/CommuteTime";
import { SettingArriveTimeType } from "../../../types";

export const ArriveButton = () => {
    const handleArriveBtn = () => {
        const data: SettingArriveTimeType = {
            todayDate: new Date()
                .toLocaleDateString()
                .replace(/\./g, "")
                .replace(/\s/g, "-"),
            arrive_time: new Date(),
        };
        useSetArriveTime(data);
    };
    return (
        <button className="bg-red-500 w-full h-2/4" onClick={handleArriveBtn}>
            출근하기
        </button>
    );
};
