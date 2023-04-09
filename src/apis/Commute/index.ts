import { UseQueryOptions, useMutation } from "@tanstack/react-query";

import { COMMUTE_KEY } from "@/apis/Commute/keys";
import { apiClient } from "@/utils/api-client";

/*
 * 출근하기 버튼 클릭 시
 */
export const setArrive = async () => {
    return await apiClient.patch("/api/commute-records/arrive");
};

export const useSetArriveMutation = (options?: UseQueryOptions) => {
    return useMutation(async () => setArrive(), {
        mutationKey: [COMMUTE_KEY.SET_ARRIVE],
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
export const setLeave = async () => {
    return await apiClient.patch("/api/commute-records/leave");
};

export const useSetLeaveMutation = (options?: UseQueryOptions) => {
    return useMutation(() => setLeave(), {
        mutationKey: [COMMUTE_KEY.SET_LEAVE],
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
export const setAmHoliday = async () => {
    return await apiClient.patch("/api/commute-records/arrive/am");
};

export const useSetAmHolidayMutation = (options?: UseQueryOptions) => {
    return useMutation(() => setAmHoliday(), {
        mutationKey: [COMMUTE_KEY.SET_AM_HOLIDAY],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};

/*
 * 오후 반차 버튼 클릭 시
 */
export const setPmHoliday = async () => {
    return await apiClient.patch("/api/commute-records/leave/pm");
};

export const useSetPmHolidayMutation = (options?: UseQueryOptions) => {
    return useMutation(() => setPmHoliday(), {
        mutationKey: [COMMUTE_KEY.SET_PM_HOLIDAY],
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
export const setAnnualHoliday = async () => {
    return await apiClient.patch("/api/commute-records/annual");
};

export const useSetAnnualHolidayMutation = (options?: UseQueryOptions) => {
    return useMutation(() => setAnnualHoliday(), {
        mutationKey: [COMMUTE_KEY.SET_ANNUAL_HOLIDAY],
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
    });
};
