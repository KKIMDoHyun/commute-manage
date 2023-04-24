import React, { useState } from "react";

import { useAtomValue } from "jotai";

import { useGetWeekCommuteRecordList } from "@/apis/Record";
import { CommuteRow } from "@/pages/Week/Record/CommuteRow";
import { mondayDateAtom } from "@/stores/week-record";
import { TCommuteRecordList } from "@/types/Commute";

export const Record = () => {
    const mondayDate = useAtomValue(mondayDateAtom);
    const [weekCommuteRecord, setWeekCommuteRecord] = useState<
        TCommuteRecordList[]
    >([]);
    const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
    const { isLoading, isError } = useGetWeekCommuteRecordList(mondayDate, {
        onSuccess: (res: any) => {
            setWeekCommuteRecord(res);
            const workTime =
                res.length > 0
                    ? res
                          .map((v: TCommuteRecordList) => v.work_time)
                          .reduce((a: number, b: number) => a + b)
                    : 0;

            setTotalWorkTime(workTime);
        },
        enabled: true,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    if (isLoading) {
        return (
            <div className="flex flex-[8] w-full h-full items-center justify-center border-black border-2">
                로딩중...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex flex-[8] w-full h-full items-center justify-center border-black border-2">
                에러...
            </div>
        );
    }

    return (
        <div className="flex flex-[8] flex-col w-full h-full items-center border-2 border-black">
            <div className="flex flex-[5] w-full flex-col divide-y-2 divide-black">
                <CommuteRow commuteRecords={weekCommuteRecord} />
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
