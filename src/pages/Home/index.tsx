import React from "react";

import { useAtomValue } from "jotai";

import { CalculateCommuteTime } from "@/pages/Home/CalculateCommuteTime";
import { CommuteButton } from "@/pages/Home/CommuteButton";
import { CommuteRecordList } from "@/pages/Home/CommuteRecordList";
import { RestButton } from "@/pages/Home/RestButton";
import { commuteButtonStateAtom } from "@/stores";

export const Home = () => {
    const commuteButtonState = useAtomValue(commuteButtonStateAtom);

    return (
        <div className="flex flex-col w-full h-full items-center pt-6">
            <CommuteRecordList />
            <CalculateCommuteTime />
            <div className="flex flex-1 flex-col w-full border-t-2 border-black pt-2">
                <div className="flex flex-1 w-full">
                    <RestButton
                        type="FULL"
                        disabled={commuteButtonState === "LEAVE"}
                    />
                    <RestButton
                        type="AM-HALF"
                        disabled={commuteButtonState === "LEAVE"}
                    />
                    <RestButton
                        type="PM-HALF"
                        disabled={commuteButtonState === "ARRIVE"}
                    />
                </div>
                <div className="flex flex-[2] flex-row w-full items-center justify-center p-3 gap-6">
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
        </div>
    );
};
