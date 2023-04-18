import React, { useState } from "react";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";

import { useGetWeekCommuteRecordList } from "@/apis/Record";
import { mondayDateAtom } from "@/stores/week-record";
import { TCommuteRecordList } from "@/types/Commute";
import { dayFormat } from "@/utils/format";

export const Record = () => {
    const mondayDate = useAtomValue(mondayDateAtom);
    const [weekCommuteRecord, setWeekCommuteRecord] = useState<
        TCommuteRecordList[]
    >([]);
    const [totalWorkTime, setTotalWorkTime] = useState<number>(0);
    const { isLoading, isError, refetch } = useGetWeekCommuteRecordList(
        mondayDate,
        {
            onSuccess: (res: any) => {
                setWeekCommuteRecord(res);
                const workTime = res
                    .map((v: TCommuteRecordList) => v.work_time)
                    .reduce((a: number, b: number) => a + b);
                setTotalWorkTime(workTime);
            },
            enabled: false,
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    React.useEffect(() => {
        refetch();
    }, [mondayDate]);

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
                {weekCommuteRecord.map((v) => {
                    return (
                        <div
                            key={v.id}
                            className="flex w-full h-1/5  items-center justify-between"
                        >
                            <div className="flex flex-[2] flex-col justify-center items-center">
                                <span className="ml-2">
                                    {dayjs(v.created_at).format("YYYY.MM.DD")}
                                </span>
                                <span>
                                    [{dayFormat[dayjs(v.created_at).get("day")]}
                                    ]
                                </span>
                            </div>
                            {v.is_annual ? (
                                <div className="flex flex-[3] justify-center items-center">
                                    <span className="font-bold">연차</span>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col flex-[1.5] justify-center items-center text-red-500">
                                        <span className="font-bold">
                                            {v.arrive_time
                                                ? dayjs(v.arrive_time).format(
                                                      "HH:mm"
                                                  )
                                                : "-"}
                                        </span>
                                        {v.is_am && (
                                            <span className="text-sm font-bold">
                                                (오전 반차)
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-[1.5] justify-center items-center text-blue-500 font-bold">
                                        <span className="font-bold">
                                            {v.leave_time
                                                ? dayjs(v.leave_time).format(
                                                      "HH:mm"
                                                  )
                                                : "-"}
                                        </span>
                                        {v.is_pm && (
                                            <span className="text-sm font-bold">
                                                (오후 반차)
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}

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
