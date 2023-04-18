import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtom, useAtomValue } from "jotai";

import { useSetArriveMutation, useSetLeaveMutation } from "@/apis/Commute";
import {
    commuteButtonStateAtom,
    lastCommuteRecordAtom,
} from "@/stores/commute";

type TCommuteButton = {
    commute: "ARRIVE" | "LEAVE";
    disabled: boolean;
};

export const CommuteButton: React.FC<TCommuteButton> = ({
    commute,
    disabled,
}) => {
    const queryClient = useQueryClient();
    const [commuteButtonState, setCommuteButtonState] = useAtom(
        commuteButtonStateAtom
    );
    const lastCommuteRecord = useAtomValue(lastCommuteRecordAtom);

    const setArriveTimeMutation = useSetArriveMutation({
        onSuccess: () => {
            setCommuteButtonState("LEAVE");
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
        },
        onError: () => {
            console.log("에러발생");
        },
    });

    const setLeaveTimeMutation = useSetLeaveMutation({
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
                setArriveTimeMutation.mutate();
            } else {
                // [TODO] 모달창 구현
                alert("이미 출근하셨습니다.");
            }
        } else {
            setLeaveTimeMutation.mutate();
        }
    };
    return (
        <button
            className={`${
                commuteButtonState === "NONE" ||
                lastCommuteRecord.is_annual ||
                disabled
                    ? "border-2 border-zinc-400 bg-slate-50 w-full h-full text-slate-300"
                    : "border-2 border-zinc-400 bg-slate-300  w-full h-full text-black font-bold"
            }`}
            disabled={
                commuteButtonState === "NONE" || lastCommuteRecord.is_annual
                    ? true
                    : disabled
            }
            onClick={handleCommuteButton}
        >
            <span>
                {commute === "ARRIVE" && "출근하기"}
                {commute === "LEAVE" && "퇴근하기"}
            </span>
        </button>
    );
};
