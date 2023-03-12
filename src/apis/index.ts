import { useMutation } from "@tanstack/react-query";

import { SettingArriveTimeType } from "../types";
import { supabase } from "../utils/supabase";

export const getCommuteTime = async () => {
    const { data: commuteList } = await supabase
        .from("commute_time")
        .select("*")
        .order("created_at");
    return commuteList;
};

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

export const setArriveTime = async (payload: SettingArriveTimeType) => {
    const { data, error } = await supabase.from("commute_time").insert(payload);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSetArriveTime = (payload: SettingArriveTimeType) => {
    return useMutation(["SET_ARRIVE_TIME"], () => setArriveTime(payload));
};
