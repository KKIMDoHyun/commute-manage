import { UseQueryOptions, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

import {
    SettingAmHolidayType,
    SettingAnnualHolidayType,
    SettingArriveTimeType,
    SettingLeaveTimeType,
} from "@/types";
import { supabase } from "@/utils/supabase";

/*
 * 출근하기 버튼 클릭 시
 */
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

/*
 * 퇴근하기 버튼 클릭 시
 */
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

/*
 * 연차/공휴일 버튼 클릭 시
 */
export const setAnnualHoliday = async (payload: SettingAnnualHolidayType) => {
    const { data, error } = await supabase.from("commute_time").insert(payload);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSetAnnualHolidayMutation = (
    payload: SettingAnnualHolidayType,
    options?: UseQueryOptions
) => {
    return useMutation(() => setAnnualHoliday(payload), {
        mutationKey: ["SET_ANNUAL_HOLIDAY_TIME"],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};

/*
 * 오전 반차 버튼 클릭 시
 */
export const setAmHoliday = async (payload: SettingAmHolidayType) => {
    const { data, error } = await supabase.from("commute_time").insert(payload);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useSetAmHolidayMutation = (
    payload: SettingAmHolidayType,
    options?: UseQueryOptions
) => {
    return useMutation(() => setAmHoliday(payload), {
        mutationKey: ["SET_AM_HOLIDAY_TIME"],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};
