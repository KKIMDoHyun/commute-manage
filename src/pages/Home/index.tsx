import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getCommuteRecordList } from "../../apis/recordList";
import { ArriveButton } from "./ArriveButton";

export const Home = () => {
    // const temp = async () => {
    //     try {
    //         const { data } = await supabase
    //             .from("commute_time")
    //             .select("arrive_time")
    //             .eq(
    //                 "todayDate",
    //                 new Date()
    //                     .toLocaleDateString()
    //                     .replace(/\./g, "")
    //                     .replace(/\s/g, "-")
    //             );

    //         if (data) {
    //             console.log(
    //                 "DATA",
    //                 new Date(data[0].arrive_time).toLocaleTimeString()
    //             );
    //         }
    //     } catch (err) {
    //         console.log("데이터가 없습니다.");
    //     }
    // };
    // console.log(
    //     new Date().toLocaleDateString().replace(/\./g, "").replace(/\s/g, "-")
    // );
    // temp();
    const { data: timeList, isLoading } = useQuery({
        queryKey: ["GET_COMMUTE_TIME_LIST"],
        queryFn: () => getCommuteRecordList(),
    });
    if (isLoading) {
        return <div>로딩중...</div>;
    }
    return (
        <div className="flex flex-col w-screen items-center pt-8 gap-12">
            <div className="flex flex-col w-5/6 h-1/2 border-black border-2 overflow-auto divide-y divide-slate-700">
                {timeList?.map((v) => {
                    return (
                        <div
                            key={v.id}
                            className="flex flex-col divide-y divide-slate-700"
                        >
                            <div className="flex p-2 bg-slate-300 box-border items-center">
                                <span>{v.arrive_time} IN</span>
                            </div>
                            <div className="flex p-2 box-border items-center">
                                {v.leave_time && (
                                    <span>{v.leave_time} OUT</span>
                                )}
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
