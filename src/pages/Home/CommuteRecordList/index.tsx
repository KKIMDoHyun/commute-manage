import React from "react";

import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";

import { useGetRecentCommuteRecordList } from "@/apis/Record";
import {
    commuteButtonStateAtom,
    commuteRecordListAtom,
    lastCommuteRecordAtom,
    weekWorkTimeAtom,
} from "@/stores/commute";
import { TCommuteRecordList } from "@/types";
import { DateFormat, TimeFormat } from "@/utils/format";

export const CommuteRecordList = () => {
    const [commuteRecordList, setCommuteRecordList] = useAtom(
        commuteRecordListAtom
    );
    const setCommuteButtonState = useSetAtom(commuteButtonStateAtom);
    const setLastCommuteRecord = useSetAtom(lastCommuteRecordAtom);
    const setWeekWorkTime = useSetAtom(weekWorkTimeAtom);

    const { isLoading, isError } = useGetRecentCommuteRecordList({
        onSuccess: (res: any) => {
            console.log(res.data);
            if (res.data.length > 0) {
                setCommuteRecordList(res.data);
                setLastCommuteRecord(res.data[0]);
                if (res.data[0].leave_time === null) {
                    setCommuteButtonState("LEAVE");
                } else {
                    setCommuteButtonState("ARRIVE");
                }
                const workTime = res.data
                    .slice(0, dayjs(res.data[0].today_date).get("day"))
                    .map((v: TCommuteRecordList) => v.work_time)
                    .reduce((a: number, b: number) => a + b, 0);
                setWeekWorkTime(workTime);
            }
        },
        enabled: true,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    if (isLoading) {
        return (
            <div className="flex flex-[2] w-5/6 justify-center items-center border-2 border-black">
                로딩중...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex flex-[2] w-5/6 justify-center items-center border-2 border-black">
                에러발생
            </div>
        );
    }

    return (
        <div className="flex-[2] overflow-auto h-full w-5/6 justify-center items-center border-2 border-black divide-y divide-slate-700">
            {commuteRecordList?.map((v: TCommuteRecordList) => {
                return (
                    <div
                        key={v.id}
                        className="flex flex-col divide-y divide-slate-700 w-full "
                    >
                        {v.leave_time && (
                            <div className="flex p-2 box-border items-center font-bold h-10">
                                <span className="flex flex-[1.5] items-center justify-center text-sm">
                                    {DateFormat(v.leave_time)}
                                </span>
                                <span className="flex flex-1 justify-center items-center text-blue-600">
                                    {TimeFormat(v.leave_time)}
                                </span>
                                <span className="flex flex-1 justify-center items-center text-blue-600">
                                    OUT
                                </span>
                            </div>
                        )}
                        {v.arrive_time && (
                            <div className="flex p-2 box-border items-center font-bold bg-slate-300 h-10">
                                <span className="flex flex-[1.5] items-center justify-center text-sm">
                                    {DateFormat(v.arrive_time)}
                                </span>
                                <span className="flex flex-1 justify-center items-center text-red-600">
                                    {TimeFormat(v.arrive_time)}
                                </span>
                                <span className="flex flex-1 justify-center items-center text-red-600">
                                    IN
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
