import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtomValue, useSetAtom } from "jotai";

import {
    useSetAmHolidayMutation,
    useSetAnnualHolidayMutation,
    useSetLeaveMutation,
} from "@/apis/Commute";
import { RECORD_KEY } from "@/apis/Record/keys";
import {
    commuteButtonStateAtom,
    lastCommuteRecordAtom,
} from "@/stores/commute";

type TRestButton = {
    type: "FULL" | "AM-HALF" | "PM-HALF";
    disabled: boolean;
};

export const RestButton = ({ type, disabled }: TRestButton) => {
    const queryClient = useQueryClient();
    const lastCommuteRecord = useAtomValue(lastCommuteRecordAtom);
    const setCommuteButtonState = useSetAtom(commuteButtonStateAtom);

    const setAnnualHolidayMutation = useSetAnnualHolidayMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([RECORD_KEY.GET_COMMUTE_RECORD_LIST]);
        },
        onError: () => {
            console.log("에러발생");
        },
    });
    const setAmHolidayMutation = useSetAmHolidayMutation({
        onSuccess: () => {
            setCommuteButtonState("LEAVE");
            queryClient.invalidateQueries([RECORD_KEY.GET_COMMUTE_RECORD_LIST]);
        },
        onError: () => {
            console.log("에러발생");
        },
    });
    const setLeaveTimeMutation = useSetLeaveMutation({
        onSuccess: () => {
            setCommuteButtonState("ARRIVE");
            queryClient.invalidateQueries([RECORD_KEY.GET_COMMUTE_RECORD_LIST]);
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
                setAnnualHolidayMutation.mutate();
            } else if (type === "AM-HALF") {
                setAmHolidayMutation.mutate();
            }
        } else {
            if (type === "PM-HALF") {
                setLeaveTimeMutation.mutate();
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
