import { atom } from "jotai";

export const isSuccessSetArriveTime = atom<boolean>(false);

export const commuteRecordListAtom = atom([]);

export const commuteButtonStateAtom = atom<"ARRIVE" | "LEAVE">("ARRIVE");
