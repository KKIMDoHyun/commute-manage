import React from "react";

import dayjs, { Dayjs } from "dayjs";

import { useGetWeekCommuteRecordList } from "@/apis/recordList";

type TRecord = {
    mondayDate: Dayjs;
};

export const Record = ({ mondayDate }: TRecord) => {
    const {
        isLoading,
        isError,
        refetch,
        data: commuteRecord,
    } = useGetWeekCommuteRecordList(mondayDate, {
        onSuccess: (res: any) => {
            console.log("RES", res);
        },
        onError: (err) => {
            console.log(err);
        },
        enabled: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    React.useEffect(() => {
        refetch();
    }, [mondayDate]);

    if (isLoading) {
        return (
            <div className="flex flex-[8] w-full h-full bg-slate-500 items-center justify-center">
                로딩중...
            </div>
        );
    }
    if (isError) {
        return <div>에러..</div>;
    }
    return (
        <div className="flex flex-[8] w-full h-full bg-slate-500">
            <div className="flex flex-col w-full items-center divide-y-2">
                {commuteRecord.map((v) => {
                    return (
                        <div
                            key={v.id}
                            className="flex w-full h-1/5 items-center"
                        >
                            <span>
                                {v.todayDate} {dayjs(v.todayDate).get("day")}
                            </span>
                            {dayjs(v.arrive_time).format("HH:mm")}{" "}
                            {dayjs(v.leave_time).format("HH:mm")} {v.work_time}
                            분
                        </div>
                    );
                })}
            </div>
        </div>
    );
};