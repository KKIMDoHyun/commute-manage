import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

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

export const getWeekCommuteRecordList = async (payload: Dayjs) => {
    console.log(
        "함수",
        payload.format()
        // payload.add(5, "day").format("YYYY-MM-DD")
    );
    const { data, error } = await supabase
        .from("commute_time")
        .select("*")
        .gt("created_at", payload.format())
        .lt("created_at", payload.add(5, "day").format())
        .order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useGetWeekCommuteRecordList = (
    payload: Dayjs,
    options?: UseQueryOptions
) => {
    console.log(
        "USE",
        payload.format("YYYY-MM-DD"),
        payload.add(5, "day").format("YYYY-MM-DD")
    );
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
