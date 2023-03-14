import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SettingArriveTimeType, SettingLeaveTimeType } from "../types";
import { TodayDateFormat } from "../utils/format";
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
    const { data, error } = await supabase
        .from("commute_time")
        .insert(payload)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSetArriveTimeMutation = (payload: SettingArriveTimeType) => {
    const queryClient = useQueryClient();

    return useMutation(["SET_ARRIVE_TIME"], () => setArriveTime(payload), {
        onSuccess: (res) => {
            console.log("UseMutation", res);
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
        },
        onError: (err) => console.log(err),
    });
};

export const setLeaveTime = async (payload: SettingLeaveTimeType) => {
    const todayDate = TodayDateFormat(new Date().toLocaleDateString());
    const { data, error } = await supabase
        .from("commute_time")
        .update(payload)
        .eq("todayDate", todayDate);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSetLeaveTimeMutation = (payload: SettingLeaveTimeType) => {
    const queryClient = useQueryClient();

    return useMutation(["SET_LEAVE_TIME"], () => setLeaveTime(payload), {
        onSuccess: (res) => {
            console.log("UseSetLeaveTime 성공", res);
            queryClient.invalidateQueries(["GET_COMMUTE_RECORD_LIST"]);
        },
        onError: (err) => console.log(err),
    });
};
