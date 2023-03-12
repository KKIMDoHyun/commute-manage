import React from "react";

import { useSetArriveTime } from "../../../apis";
import { SettingArriveTimeType } from "../../../types";

export const ArriveButton = () => {
    const curr = new Date();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const data: SettingArriveTimeType = {
        todayDate: new Date()
            .toLocaleDateString()
            .replace(/\./g, "")
            .replace(/\s/g, "-"),
        arrive_time: new Date(utc + KR_TIME_DIFF),
    };
    const setArriveTimeMutation = useSetArriveTime(data);
    if (setArriveTimeMutation.isSuccess) {
        console.log("성공");
        console.log(data);
    }
    if (setArriveTimeMutation.isError) {
        return <div>에러</div>;
    }
    return (
        <button
            className="bg-red-500 w-full h-2/4"
            onClick={() => setArriveTimeMutation.mutate()}
        >
            출근하기
        </button>
    );
};
