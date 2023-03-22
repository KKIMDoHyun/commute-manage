import { atom } from "jotai";

import { TCommuteRecordList } from "@/types";

export const isSuccessSetArriveTime = atom<boolean>(false);

export const commuteRecordListAtom = atom([]);

export const lastCommuteRecordAtom = atom<TCommuteRecordList>({
    id: 0,
    created_at: "",
    todayDate: "",
    arrive_time: "",
    leave_time: "",
    work_time: "",
});

export const commuteButtonStateAtom = atom<"ARRIVE" | "LEAVE">("ARRIVE");

export const weekWorkTimeAtom = atom(0);
