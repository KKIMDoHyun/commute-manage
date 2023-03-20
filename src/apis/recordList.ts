import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { supabase } from "../utils/supabase";

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
    });
};

export const getWeekCommuteRecordList = async () => {
    const { data, error } = await supabase
        .from("commute_time")
        .select("*")
        .order("created_at", { ascending: false })
        .rangeGte("created_at", "[2023-03-13 08:30, 2023-03-20 14:22]");
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useGetWeekCommuteRecordList = (options?: UseQueryOptions) => {
    return useQuery(
        ["GET_WEEK_COMMUTE_RECORD_LIST"],
        () => getWeekCommuteRecordList(),
        {
            onSuccess: (res) => {
                options?.onSuccess?.(res);
            },
            onError: (err) => {
                options?.onError?.(err);
            },
        }
    );
};
