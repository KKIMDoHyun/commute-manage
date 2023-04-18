import { atom } from "jotai";

import { TCommuteRecordList } from "@/types/Commute";

export const commuteRecordListAtom = atom([]);

export const lastCommuteRecordAtom = atom<TCommuteRecordList>({
    id: 0,
    created_at: "",
    todayDate: "",
    arrive_time: "",
    leave_time: "",
    work_time: "",
    is_am: false,
    is_pm: false,
    is_annual: false,
});

export const commuteButtonStateAtom = atom<"ARRIVE" | "LEAVE" | "NONE">(
    "ARRIVE"
);

export const weekWorkTimeAtom = atom(0);
