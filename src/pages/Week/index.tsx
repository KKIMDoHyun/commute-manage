import React from "react";

import dayjs, { Dayjs } from "dayjs";

import { Record } from "@/pages/Week/Record";

// 몇번째 주인지 구하기
const getWeek = (date: Dayjs) => {
    const currentDate = date.get("date");
    const firstDay = date.set("date", 1).get("day");

    return Math.ceil((currentDate + firstDay) / 7);
};

// 그 주의 월요일 구하기
const getMonday = (date: Dayjs) => {
    const day = date.get("day");
    const diff = date.get("date") - day + (day == 0 ? -6 : 1);
    return date.set("date", diff);
};

export const Week = () => {
    const [mondayDate, setMondayDate] = React.useState<Dayjs>(
        getMonday(dayjs())
    );

    return (
        <div className="flex flex-col w-full h-full items-center p-8 gap-4">
            <div className="flex flex-[1] w-full items-center justify-center">
                <span>주간 보기</span>
            </div>
            <div className="flex flex-[1] flex-col w-full bg-slate-400 justify-center items-center">
                <div className="flex gap-5">
                    <button
                        className="flex"
                        onClick={() => {
                            setMondayDate(mondayDate.add(-1, "week"));
                        }}
                    >
                        <span>{"<"}</span>
                    </button>
                    <span>{`${mondayDate.get("month") + 1}월 ${getWeek(
                        mondayDate
                    )}째주`}</span>
                    <button
                        onClick={() => {
                            setMondayDate(mondayDate.add(1, "week"));
                        }}
                    >
                        <span>{">"}</span>
                    </button>
                </div>
                <div>
                    <span>{`${mondayDate.format("YYYY-MM-DD")} ~ ${mondayDate
                        .add(5, "day")
                        .format("YYYY-MM-DD")}`}</span>
                </div>
            </div>
            <Record mondayDate={mondayDate} />
        </div>
    );
};
