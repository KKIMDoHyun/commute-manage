import React from "react";

import dayjs, { Dayjs } from "dayjs";
import { useAtom } from "jotai";

import { useGetWeekCommuteRecordList } from "../../apis/recordList";
import { currentAtom } from "../../stores/weekRecord";

export const Week = () => {
    const [current, setCurrent] = useAtom(currentAtom);
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

    const { isLoading, isError } = useGetWeekCommuteRecordList({
        onSuccess: (res: any) => {
            console.log(res);
        },
    });

    React.useEffect(() => {
        setCurrent(getMonday(dayjs()));
    }, []);

    if (isLoading) {
        return <div>로딩중...</div>;
    }
    if (isError) {
        return <div>에러..</div>;
    }
    return (
        <div className="flex flex-col w-full h-full items-center p-8 gap-4">
            <div className="flex flex-[1] w-full items-center justify-center">
                <span>주간 보기</span>
            </div>
            <div className="flex flex-[1] flex-col w-full bg-slate-400 justify-center items-center">
                <div className="flex gap-5">
                    <button
                        onClick={() => {
                            setCurrent(current.add(-1, "week"));
                            console.log(current.format("YYYY-MM-DD"));
                        }}
                    >
                        <span>{"<"}</span>
                    </button>
                    <span>{`${current.get("month") + 1}월 ${getWeek(
                        current
                    )}째주`}</span>
                    <button
                        onClick={() => {
                            setCurrent(current.add(1, "week"));
                            console.log(current.format("YYYY-MM-DD"));
                        }}
                    >
                        <span>{">"}</span>
                    </button>
                </div>
                <div>
                    <span>{`${current.format("YYYY-MM-DD")}~${current
                        .add(5, "day")
                        .format("YYYY-MM-DD")}`}</span>
                </div>
            </div>
            <div className="flex flex-[8] w-full items-center justify-center bg-slate-500">
                기록 표시
            </div>
        </div>
    );
};
