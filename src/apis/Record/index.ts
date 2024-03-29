import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { RECORD_KEY } from "@/apis/Record/keys";
import { TCommuteRecordList } from "@/types/Commute";
import { instance } from "@/utils/axios-instance";

export const getRecentCommuteRecordList = async (): Promise<
    TCommuteRecordList[]
> => {
    return await instance
        .get("/commute-records/recent")
        .then((res) => res.data);
};

export const useGetRecentCommuteRecordList = (options?: UseQueryOptions) => {
    return useQuery(
        [RECORD_KEY.GET_COMMUTE_RECORD_LIST],
        () => getRecentCommuteRecordList(),
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
    return await instance
        .get("/commute-records/week", {
            params: { mondayDate: mondayDate },
        })
        .then((res) => res.data);
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

export const getUserCommuteRecordList = async (userId: number) => {
    return await instance.get(`/api/commute-records/user/${userId}`);
};

export const useGetUserCommuteRecordList = (
    userId: number,
    options?: UseQueryOptions
) => {
    return useQuery(
        [RECORD_KEY.GET_USER_COMMUTE_RECORD_LIST, userId],
        () => getUserCommuteRecordList(userId),
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
