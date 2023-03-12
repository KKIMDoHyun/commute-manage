import React from "react";

import { useAtomValue } from "jotai";

import { useGetCommuteRecordList } from "../../apis/recordList";
import { commuteRecordListAtom } from "../../stores";
import { TCommuteRecordList } from "../../types";
import { DateFormat, TimeFormat } from "../../utils/format";
import { ArriveButton } from "./ArriveButton";

export const Home = () => {
    const commuteRecordList = useAtomValue(commuteRecordListAtom);

    const { isLoading, isError } = useGetCommuteRecordList();

    if (isLoading) {
        return <div>로딩중...</div>;
    }
    if (isError) {
        return <div>에러발생</div>;
    }
    return (
        <div className="flex flex-col w-screen items-center pt-8 gap-12">
            <div className="flex flex-col w-5/6 h-96 border-black border-2 overflow-auto divide-y divide-slate-700">
                {commuteRecordList?.map((v: TCommuteRecordList) => {
                    return (
                        <div
                            key={v.id}
                            className="flex flex-col divide-y divide-slate-700"
                        >
                            {v.leave_time && (
                                <div className="flex p-2 box-border items-center flex-1 font-bold">
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
                            <div className="flex p-2 bg-slate-300 box-border items-center font-bold">
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
            <div className="flex flex-col w-5/6 bg-slate-400">
                <div className="flex flex-col items-center justify-center">
                    <span>이번 주 업무 시간</span>
                    <span>@@시간</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span>이번 주 남은 시간</span>
                    <span>@@시간</span>
                </div>
            </div>
            <div className="flex flex-row w-5/6 h-1/6 bg-red-800 items-center gap-8">
                <ArriveButton />
                <button className="bg-red-500 w-full h-2/4">퇴근하기</button>
            </div>
        </div>
    );
};
