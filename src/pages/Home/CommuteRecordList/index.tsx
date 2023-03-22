import React from "react";

import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";

import { useGetCommuteRecordList } from "@/apis/recordList";
import {
    commuteButtonStateAtom,
    commuteRecordListAtom,
    lastCommuteRecordAtom,
    weekWorkTimeAtom,
} from "@/stores";
import { TCommuteRecordList } from "@/types";
import { DateFormat, TimeFormat } from "@/utils/format";

export const CommuteRecordList = () => {
    const [commuteRecordList, setCommuteRecordList] = useAtom(
        commuteRecordListAtom
    );
    const setCommuteButtonState = useSetAtom(commuteButtonStateAtom);
    const setLastCommuteRecord = useSetAtom(lastCommuteRecordAtom);
    const setWeekWorkTime = useSetAtom(weekWorkTimeAtom);

    const { isLoading, isError } = useGetCommuteRecordList({
        onSuccess: (res: any) => {
            if (res.length > 0) {
                setCommuteRecordList(res);
                setLastCommuteRecord(res[0]);
                if (res[0].leave_time === null) {
                    setCommuteButtonState("LEAVE");
                } else {
                    setCommuteButtonState("ARRIVE");
                }
                const workTime = res
                    .slice(0, dayjs(res[0].todayDate).get("day"))
                    .map((v: TCommuteRecordList) => v.work_time)
                    .reduce((a: number, b: number) => a + b);
                setWeekWorkTime(workTime);
            }
        },
    });

    if (isLoading) {
        return <div>로딩중...</div>;
    }
    if (isError) {
        return <div>에러발생</div>;
    }
    return (
        <div className="flex-1 overflow-auto h-full w-full divide-y divide-slate-700">
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
                    </div>
                );
            })}
        </div>
    );
};
