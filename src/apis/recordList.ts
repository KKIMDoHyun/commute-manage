import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { supabase } from "@/utils/supabase";

export const getCommuteRecordList = async () => {
    const { data, error } = await supabase
        .from("commute_time")
        .select("*")
        .limit(7)
        .order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useGetCommuteRecordList = (options?: UseQueryOptions) => {
    return useQuery(["GET_COMMUTE_RECORD_LIST"], () => getCommuteRecordList(), {
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
        enabled: !!options?.enabled,
    });
};

export const getWeekCommuteRecordList = async (payload: Dayjs) => {
    const { data, error } = await supabase
        .from("commute_time")
        .select("*")
        .gte("created_at", payload.startOf("d").format())
        .lte("created_at", payload.add(4, "day").endOf("d").format())
        .order("created_at", { ascending: true });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useGetWeekCommuteRecordList = (
    payload: Dayjs,
    options?: UseQueryOptions
) => {
    return useQuery(
        ["GET_WEEK_COMMUTE_RECORD_LIST", payload],
        () => getWeekCommuteRecordList(payload),
        {
            onSuccess: (res) => {
                options?.onSuccess?.(res);
            },
            onError: (err) => {
                options?.onError?.(err);
            },
            enabled: !!options?.enabled,
        }
    );
};
