import React from "react";

import dayjs from "dayjs";

import { TCommuteRecordList } from "@/types/Commute";
import { dayFormat } from "@/utils/format";

type TCommuteRow = {
    commuteRecords: TCommuteRecordList[];
};
export const CommuteRow: React.FC<TCommuteRow> = ({ commuteRecords }) => {
    return (
        <>
            {commuteRecords.map((record) => {
                return (
                    <div
                        key={record.id}
                        className="flex w-full h-1/5  items-center justify-between"
                    >
                        <div className="flex flex-[2] flex-col justify-center items-center">
                            <span className="ml-2">
                                {dayjs(record.created_at).format("YYYY.MM.DD")}
                            </span>
                            <span>
                                [
                                {dayFormat[dayjs(record.created_at).get("day")]}
                                ]
                            </span>
                        </div>
                        {record.is_annual ? (
                            <div className="flex flex-[3] justify-center items-center">
                                <span className="font-bold">연차</span>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col flex-[1.5] justify-center items-center text-red-500">
                                    <span className="font-bold">
                                        {record.arrive_time
                                            ? dayjs(record.arrive_time).format(
                                                  "HH:mm"
                                              )
                                            : "-"}
                                    </span>
                                    {record.is_am && (
                                        <span className="text-sm font-bold">
                                            (오전 반차)
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col flex-[1.5] justify-center items-center text-blue-500 font-bold">
                                    <span className="font-bold">
                                        {record.leave_time
                                            ? dayjs(record.leave_time).format(
                                                  "HH:mm"
                                              )
                                            : "-"}
                                    </span>
                                    {record.is_pm && (
                                        <span className="text-sm font-bold">
                                            (오후 반차)
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                        <span className="flex flex-[2] justify-center items-center font-bold">
                            {`${Math.floor(
                                record.work_time / 60
                            )}시간 ${Math.floor(record.work_time % 60)}분`}
                        </span>
                    </div>
                );
            })}
        </>
    );
};
