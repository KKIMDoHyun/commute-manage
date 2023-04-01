import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { RECORD_KEY } from "@/apis/Record/keys";

export const getCommuteRecordList = async () => {
    //
};

export const useGetCommuteRecordList = (options?: UseQueryOptions) => {
    return useQuery(
        [RECORD_KEY.GET_COMMUTE_RECORD_LIST],
        () => getCommuteRecordList(),
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

export const getWeekCommuteRecordList = async (mondayDate: Dayjs) => {
    console.log(mondayDate);
};

export const useGetWeekCommuteRecordList = (
    mondayDate: Dayjs,
    options?: UseQueryOptions
) => {
    return useQuery(
        [RECORD_KEY.GET_WEEK_COMMUTE_RECORD_LIST, mondayDate],
        () => getWeekCommuteRecordList(mondayDate),
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
