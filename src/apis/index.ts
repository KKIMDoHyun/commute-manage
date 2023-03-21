import { UseQueryOptions, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

import { SettingArriveTimeType, SettingLeaveTimeType } from "../types";
import { supabase } from "../utils/supabase";

export const getArriveTime = async () => {
    const { data: arriveTime } = await supabase
        .from("commute_time")
        .select("arrive_item")
        .eq("todayDate", dayjs().format("YYYY-MM-DD"));
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

export const useSetArriveTimeMutation = (
    payload: SettingArriveTimeType,
    options?: UseQueryOptions
) => {
    return useMutation(async () => setArriveTime(payload), {
        mutationKey: ["SET_ARRIVE_TIME"],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};

export const setLeaveTime = async (payload: SettingLeaveTimeType) => {
    const { data, error } = await supabase
        .from("commute_time")
        .update(payload)
        .eq("todayDate", dayjs().format("YYYY-MM-DD"));
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSetLeaveTimeMutation = (
    payload: SettingLeaveTimeType,
    options?: UseQueryOptions
) => {
    return useMutation(() => setLeaveTime(payload), {
        mutationKey: ["SET_LEAVE_TIME"],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};
