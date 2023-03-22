import React from "react";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";

import { useGetWeekCommuteRecordList } from "@/apis/recordList";
import { mondayDateAtom } from "@/stores/weekRecord";
import { dayFormat } from "@/utils/format";

export const Record = () => {
    const mondayDate = useAtomValue(mondayDateAtom);

    const {
        isLoading,
        isError,
        refetch,
        data: commuteRecord,
    } = useGetWeekCommuteRecordList(mondayDate, {
        enabled: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    React.useEffect(() => {
        refetch();
    }, [mondayDate]);

    if (isLoading) {
        return (
            <div className="flex flex-[8] w-full h-full items-center justify-center border-black">
                로딩중...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex flex-[8] w-full h-full items-center justify-center border-black">
                에러...
            </div>
        );
    }

    const totalWorkTime =
        commuteRecord.length > 0 &&
        commuteRecord.map((v) => v.work_time).reduce((a, b) => a + b);
    const filteredRecord = commuteRecord.filter((v) => v.leave_time !== null);

    return (
        <div className="flex flex-[8] flex-col w-full h-full items-center border-2 border-black">
            <div className="flex flex-[5] w-full flex-col divide-y-2 divide-black">
                {filteredRecord.map((v) => {
                    return (
                        <div
                            key={v.id}
                            className="flex w-full h-1/5  items-center justify-between"
                        >
                            <div className="flex flex-[2] flex-col justify-center items-center">
                                <span className="ml-2">
                                    {dayjs(v.todayDate).format("YYYY/M/D")}
                                </span>
                                <span>
                                    ({dayFormat[dayjs(v.todayDate).get("day")]})
                                </span>
                            </div>
                            <span className="flex flex-[1.5] justify-center items-center text-red-500 font-bold">
                                {dayjs(v.arrive_time).format("HH:mm")}
                            </span>
                            <span className="flex flex-[1.5] justify-center items-center text-blue-500 font-bold">
                                {dayjs(v.leave_time).format("HH:mm")}
                            </span>
                            <span className="flex flex-[2] justify-center items-center font-bold">
                                {`${Math.floor(
                                    v.work_time / 60
                                )}시간 ${Math.floor(v.work_time % 60)}분`}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-1 flex-col w-full border-t-2 border-black items-center justify-center">
                <span className="text-base">이번 주 일한 시간</span>
                <span className="text-lg font-bold">
                    {`${Math.floor(totalWorkTime / 60)}시간 ${Math.floor(
                        totalWorkTime % 60
                    )}분`}
                </span>
            </div>
        </div>
    );
};
