import React from "react";

import { useAtomValue } from "jotai";

import { commuteButtonStateAtom } from "../../stores";
import { CalculateCommuteTime } from "./CalculateCommuteTime";
import { CommuteButton } from "./CommuteButton";
import { CommuteRecordList } from "./CommuteRecordList";

export const Home = () => {
    const commuteButtonState = useAtomValue(commuteButtonStateAtom);

    return (
        <div className="flex flex-col w-full h-full items-center pt-8 gap-4">
            <div className="flex w-5/6 h-3/5 justify-center items-center border-2 border-black">
                <CommuteRecordList />
            </div>
            <div className="flex w-full h-1/6">
                <CalculateCommuteTime />
            </div>
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
