import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import {
    useSetAmHolidayMutation,
    useSetAnnualHolidayMutation,
    useSetPmHolidayMutation,
} from "@/apis/Commute";
import { RECORD_KEY } from "@/apis/Record/keys";
import {
    commuteButtonStateAtom,
    lastCommuteRecordAtom,
} from "@/stores/commute";

type RestButtonProps = {
    type: "ANNUAL" | "AM-HALF" | "PM-HALF";
    disabled: boolean;
};

export const RestButton: React.FC<RestButtonProps> = ({ type, disabled }) => {
    const queryClient = useQueryClient();
    const lastCommuteRecord = useAtomValue(lastCommuteRecordAtom);
    const commuteButtonState = useAtomValue(commuteButtonStateAtom);
    const setAnnualHolidayMutation = useSetAnnualHolidayMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([RECORD_KEY.GET_COMMUTE_RECORD_LIST]);
        },
        onError: (err: any) => {
            console.log("에러발생", err.response.data.message);
        },
    });
    const setAmHolidayMutation = useSetAmHolidayMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([RECORD_KEY.GET_COMMUTE_RECORD_LIST]);
        },
        onError: (err: any) => {
            console.log("에러발생", err.response.data.message);
        },
    });
    const setLeaveTimeMutation = useSetPmHolidayMutation({
        onSuccess: () => {
            queryClient.invalidateQueries([RECORD_KEY.GET_COMMUTE_RECORD_LIST]);
            console.log("퇴근성공");
        },
        onError: (err: any) => {
            console.log("에러발생", err.response.data.message);
        },
    });

    const handleCommuteButton = () => {
        if (type === "ANNUAL") {
            setAnnualHolidayMutation.mutate();
        } else if (type === "AM-HALF") {
            setAmHolidayMutation.mutate();
        } else {
            setLeaveTimeMutation.mutate();
        }
    };
    return (
        <div className="flex flex-1 w-full justify-center items-center gap-3 p-2">
            <button
                disabled={
                    commuteButtonState === "NONE" || lastCommuteRecord.is_annual
                        ? true
                        : disabled
                }
                className={`${
                    commuteButtonState === "NONE" ||
                    lastCommuteRecord.is_annual ||
                    disabled
                        ? "border-2 border-zinc-400 bg-slate-50 w-full h-full text-slate-300"
                        : "border-2 border-zinc-400 bg-slate-300  w-full h-full text-black font-bold"
                }`}
                onClick={handleCommuteButton}
            >
                <span>
                    {type === "ANNUAL" && "연차/공휴일"}
                    {type === "AM-HALF" && "오전 반차"}
                    {type === "PM-HALF" && "오후 반차"}
                </span>
            </button>
        </div>
    );
};
