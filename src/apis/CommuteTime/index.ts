import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { isSuccessSetArriveTime } from "../../stores";
import { SettingArriveTimeType } from "../../types";
import { supabase } from "../../utils/supabase";

export const getArriveTime = async () => {
    const { data: arriveTime } = await supabase
        .from("commute_time")
        .select("arrive_item")
        .eq(
            "todayDate",
            new Date()
                .toLocaleDateString()
                .replace(/\./g, "")
                .replace(/\s/g, "-")
        );
    return arriveTime;
};

export const Supabase_setArriveTime = async (
    payload: SettingArriveTimeType
) => {
    return await supabase.from("commute_time").insert(payload);
};

const [, setSuccessSetArriveTime] = useAtom(isSuccessSetArriveTime);
export const useSetArriveTime = async (payload: SettingArriveTimeType) => {
    return useMutation(
        async () => {
            return Supabase_setArriveTime(payload);
        },
        {
            mutationKey: ["SET_ARRIVE_TIME"],
            onSuccess: () => {
                setSuccessSetArriveTime(true);
                console.log("출근함");
            },
        }
    );
};
