import React from "react";

import { useAtomValue } from "jotai";

import { commuteRecordListAtom } from "../../../stores";
import { TCommuteRecordList } from "../../../types";
import { DateFormat, TimeFormat } from "../../../utils/format";

export const CommuteRecordList = () => {
    const commuteRecordList = useAtomValue(commuteRecordListAtom);

    return (
        <div className="flex w-5/6 h-5/6 border-black border-2 overflow-auto divide-y divide-slate-700">
            {commuteRecordList?.map((v: TCommuteRecordList) => {
                return (
                    <div
                        key={v.id}
                        className="flex flex-col divide-y divide-slate-700 w-full"
                    >
                        {v.leave_time && (
                            <div className="flex p-2 box-border items-center font-bold h-10">
                                <span className="flex flex-1 justify-center items-center text-sm">
                                    {DateFormat(v.leave_time)}
                                </span>
                                <span className="flex flex-1 justify-center items-center">
                                    {TimeFormat(v.leave_time)}
                                </span>
                                <span className="flex flex-1 justify-center items-center text-blue-600">
                                    OUT
                                </span>
                            </div>
                        )}
                        <div className="flex p-2 box-border items-center font-bold bg-slate-300 h-10">
                            <span className="flex flex-1 justify-center items-center text-sm">
                                {DateFormat(v.arrive_time)}
                            </span>
                            <span className="flex flex-1 justify-center items-center">
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
