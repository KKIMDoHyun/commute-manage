import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtomValue, useSetAtom } from "jotai";

import {
    useSetArriveTimeMutation,
    useSetLeaveTimeMutation,
} from "../../../apis";
import { commuteButtonStateAtom, lastCommuteRecordAtom } from "../../../stores";
import { SettingArriveTimeType, SettingLeaveTimeType } from "../../../types";

type TCommuteButton = {
    commute: "ARRIVE" | "LEAVE";
    disabled: boolean;
};

export const CommuteButton = ({ commute, disabled }: TCommuteButton) => {
    const queryClient = useQueryClient();
    const setCommuteButtonState = useSetAtom(commuteButtonStateAtom);
    const lastCommuteRecord = useAtomValue(lastCommuteRecordAtom);
    const [arrive, setArrive] = useState<SettingArriveTimeType>({
        todayDate: "",
        arrive_time: "",
    });
    const [leave, setLeave] = useState<SettingLeaveTimeType>({
        leave_time: "",
        work_time: 0,
    });

    const setArriveTimeMutation = useSetArriveTimeMutation(arrive, {
        onSuccess: () => {
            setCommuteButtonState("LEAVE");
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
            console.log("출근성공");
        },
        onError: () => {
            console.log("에러발생");
        },
    });

    const setLeaveTimeMutation = useSetLeaveTimeMutation(leave, {
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
            if (
                dayjs().get("date") !==
                dayjs(lastCommuteRecord?.arrive_time).get("date")
            ) {
                const arriveData: SettingArriveTimeType = {
                    todayDate: dayjs().format("YYYY-MM-DD"),
                    arrive_time: dayjs().format(),
                };
                setArrive(arriveData);
                setArriveTimeMutation.mutate();
            } else {
                // [TODO] 모달창 구현
                alert("이미 출근하셨습니다.");
            }
        } else {
            const leaveData: SettingLeaveTimeType = {
                leave_time: dayjs().format(),
                work_time: Math.floor(
                    dayjs()
                        .startOf("minute")
                        .diff(
                            dayjs(lastCommuteRecord.arrive_time).startOf(
                                "minute"
                            ),
                            "minute"
                        )
                ),
            };
            setLeave(leaveData);
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
