import dayjs, { Dayjs } from "dayjs";
import { atom } from "jotai";

// 몇번째 주인지 구하기
export const getWeek = (date: Dayjs) => {
    const currentDate = date.get("date");
    const firstDay = date.set("date", 1).get("day");

    return Math.ceil((currentDate + firstDay) / 7);
};

// 그 주의 월요일 구하기
export const getMonday = (date: Dayjs) => {
    const day = date.get("day");
    const diff = date.get("date") - day + (day == 0 ? -6 : 1);
    return date.set("date", diff);
};

export const mondayDateAtom = atom<Dayjs>(getMonday(dayjs()));
