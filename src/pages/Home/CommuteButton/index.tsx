import React from "react";

import { useAtom } from "jotai";

import { useSetArriveTimeMutation, useSetLeaveTime } from "../../../apis";
import { commuteButtonStateAtom } from "../../../stores";
import { SettingArriveTimeType, SettingLeaveTimeType } from "../../../types";

type TCommuteButton = {
    commute: "ARRIVE" | "LEAVE";
    disabled: boolean;
};

export const CommuteButton = ({ commute, disabled }: TCommuteButton) => {
    const [, setCommuteButtonState] = useAtom(commuteButtonStateAtom);

    const curr = new Date();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const arriveData: SettingArriveTimeType = {
        todayDate: new Date()
            .toLocaleDateString()
            .replace(/\./g, "")
            .replace(/\s/g, "-"),
        arrive_time: new Date(utc + KR_TIME_DIFF),
    };
    const leaveData: SettingLeaveTimeType = {
        leave_time: new Date(utc + KR_TIME_DIFF),
    };
    const setArriveTimeMutation = useSetArriveTimeMutation(arriveData);
    const setLeaveTimeMutation = useSetLeaveTime(leaveData);

    // if (setArriveTimeMutation.isSuccess) {
    //     setCommuteButtonState("LEAVE");
    //     console.log("출근 성공");
    // }
    // if (setLeaveTimeMutation.isSuccess) {
    //     setCommuteButtonState("ARRIVE");
    //     console.log("퇴근 성공");
    // }

    const handleCommuteButton = () => {
        if (commute === "ARRIVE") {
            setArriveTimeMutation.mutate();
            console.log(
                setArriveTimeMutation.isSuccess,
                setArriveTimeMutation.isError,
                setArriveTimeMutation.isLoading
            );
            setCommuteButtonState("LEAVE");
            console.log("출근 성공");
        } else {
            setLeaveTimeMutation.mutate();
            setCommuteButtonState("ARRIVE");
            console.log("퇴근 성공");
        }
    };
    return (
        <button
            className={`${
                disabled
                    ? "border-2 border-zinc-400 bg-slate-50 w-full h-2/4"
                    : "border-2 border-zinc-400 bg-slate-300  w-full h-2/4"
            }`}
            disabled={disabled}
            onClick={handleCommuteButton}
        >
            <span className={`${disabled ? "text-slate-300" : "font-bold"}`}>
                {commute === "ARRIVE" && "출근하기"}
                {commute === "LEAVE" && "퇴근하기"}
            </span>
        </button>
    );
};
