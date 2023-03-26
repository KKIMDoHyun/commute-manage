import React, { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtomValue, useSetAtom } from "jotai";

import {
    useSetAmHolidayMutation,
    useSetAnnualHolidayMutation,
    useSetLeaveTimeMutation,
} from "@/apis/commute";
import {
    commuteButtonStateAtom,
    lastCommuteRecordAtom,
} from "@/stores/commute";
import {
    SettingAmHolidayType,
    SettingAnnualHolidayType,
    SettingLeaveTimeType,
} from "@/types";

type TRestButton = {
    type: "FULL" | "AM-HALF" | "PM-HALF";
    disabled: boolean;
};

export const RestButton = ({ type, disabled }: TRestButton) => {
    const queryClient = useQueryClient();
    const lastCommuteRecord = useAtomValue(lastCommuteRecordAtom);
    const setCommuteButtonState = useSetAtom(commuteButtonStateAtom);
    const [annualHolidayData, setAnnualHolidayData] =
        useState<SettingAnnualHolidayType>({
            todayDate: "",
            arrive_time: "",
            leave_time: "",
            work_time: 0,
        });
    const [arrive, setArrive] = useState<SettingAmHolidayType>({
        todayDate: "",
        arrive_time: "",
        AM: false,
    });
    const [leave, setLeave] = useState<SettingLeaveTimeType>({
        leave_time: "",
        work_time: 0,
    });
    const setAnnualHolidayMutation = useSetAnnualHolidayMutation(
        annualHolidayData,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
            },
            onError: () => {
                console.log("에러발생");
            },
        }
    );
    const setAmHolidayMutation = useSetAmHolidayMutation(arrive, {
        onSuccess: () => {
            setCommuteButtonState("LEAVE");
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
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
        if (
            dayjs().get("date") !==
            dayjs(lastCommuteRecord?.arrive_time).get("date")
        ) {
            if (type === "FULL") {
                const annualHoliday: SettingAnnualHolidayType = {
                    todayDate: dayjs().format("YYYY-MM-DD"),
                    arrive_time: dayjs()
                        .set("hour", 9)
                        .startOf("hour")
                        .format(),
                    leave_time: dayjs()
                        .set("hour", 18)
                        .startOf("hour")
                        .format(),
                    work_time: 480,
                };
                setAnnualHolidayData(annualHoliday);
                setAnnualHolidayMutation.mutate();
            } else if (type === "AM-HALF") {
                const amHalfData: SettingAmHolidayType = {
                    todayDate: dayjs().format("YYYY-MM-DD"),
                    arrive_time: dayjs().format(),
                    AM: true,
                };
                setArrive(amHalfData);
                setAmHolidayMutation.mutate();
            }
        } else {
            if (type === "PM-HALF") {
                {
                    const pmHalfData: SettingLeaveTimeType = {
                        leave_time: dayjs().format(),
                        work_time: Math.floor(
                            dayjs()
                                .startOf("minute")
                                .diff(
                                    dayjs(
                                        lastCommuteRecord.arrive_time
                                    ).startOf("minute"),
                                    "minute"
                                ) + 240
                        ),
                    };
                    setLeave(pmHalfData);
                    setLeaveTimeMutation.mutate();
                    console.log("오후 반차", pmHalfData);
                }
            } else {
                // [TODO] 모달창 구현
                alert("이미 출근하셨습니다.");
            }
        }
    };
    return (
        <div className="flex flex-1 w-full justify-center items-center gap-3 p-2">
            <button
                disabled={disabled}
                className={`${
                    disabled
                        ? "border-2 border-zinc-400 bg-slate-50 w-full h-full"
                        : "border-2 border-zinc-400 bg-slate-300  w-full h-full"
                }`}
                onClick={handleCommuteButton}
            >
                <span
                    className={`${disabled ? "text-slate-300" : "font-bold"}`}
                >
                    {type === "FULL" && "연차/공휴일"}
                    {type === "AM-HALF" && "오전 반차"}
                    {type === "PM-HALF" && "오후 반차"}
                </span>
            </button>
        </div>
    );
};
