import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import {
    useSetArriveTimeMutation,
    useSetLeaveTimeMutation,
} from "../../../apis";
import { arriveTimeAtom, commuteButtonStateAtom } from "../../../stores";
import { SettingArriveTimeType, SettingLeaveTimeType } from "../../../types";
import { TodayDateFormat } from "../../../utils/format";

type TCommuteButton = {
    commute: "ARRIVE" | "LEAVE";
    disabled: boolean;
};

export const CommuteButton = ({ commute, disabled }: TCommuteButton) => {
    const queryClient = useQueryClient();
    const setCommuteButtonState = useSetAtom(commuteButtonStateAtom);
    const arriveTime = useAtomValue(arriveTimeAtom);

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
        work_time: Math.floor(
            (new Date(TodayDateFormat(new Date(utc + KR_TIME_DIFF))).getTime() -
                new Date(TodayDateFormat(new Date(arriveTime))).getTime()) /
                (1000 * 60)
        ),
    };
    const setArriveTimeMutation = useSetArriveTimeMutation(arriveData, {
        onSuccess: () => {
            setCommuteButtonState("LEAVE");
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
            console.log("출근성공");
        },
        onError: () => {
            console.log("에러발생");
        },
    });
    const setLeaveTimeMutation = useSetLeaveTimeMutation(leaveData, {
        onSuccess: () => {
            setCommuteButtonState("ARRIVE");
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
            console.log("퇴근성공");
        },
        onError: () => {
            console.log("에러발생");
        },
    });

    const handleCommuteButton = () => {
        if (commute === "ARRIVE") {
            setArriveTimeMutation.mutate();
        } else {
            setLeaveTimeMutation.mutate();
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
