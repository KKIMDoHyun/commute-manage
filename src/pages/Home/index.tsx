import React from "react";

import { useAtomValue } from "jotai";

import { useGetCommuteRecordList } from "../../apis/recordList";
import { commuteButtonStateAtom } from "../../stores";
import { CalculateCommuteTime } from "./CalculateCommuteTime";
import { CommuteButton } from "./CommuteButton";
import { CommuteRecordList } from "./CommuteRecordList";

export const Home = () => {
    const commuteButtonState = useAtomValue(commuteButtonStateAtom);

    const { isLoading, isError } = useGetCommuteRecordList();

    if (isLoading) {
        return <div>로딩중...</div>;
    }
    if (isError) {
        return <div>에러발생</div>;
    }
    return (
        <div className="flex flex-col w-full h-full items-center pt-8 gap-10">
            <CommuteRecordList />
            <CalculateCommuteTime />
            <div className="flex flex-row w-5/6 h-1/6 items-center gap-8">
                <CommuteButton
                    commute="ARRIVE"
                    disabled={commuteButtonState === "LEAVE"}
                />
                <CommuteButton
                    commute="LEAVE"
                    disabled={commuteButtonState === "ARRIVE"}
                />
            </div>
        </div>
    );
};
