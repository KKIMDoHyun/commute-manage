import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { TEAM_KEY } from "@/apis/Team/keys";
import { apiClient } from "@/utils/api-client";

export const getTeamMemberList = async () => {
    return await apiClient.get("/api/team/members");
};

export const useGetTeamMemberList = (options?: UseQueryOptions) => {
    return useQuery([TEAM_KEY.GET_TEAM_MEMBER], () => getTeamMemberList(), {
        onSuccess: (res) => {
            options?.onSuccess?.(res);
        },
        onError: (err) => {
            options?.onError?.(err);
        },
        enabled: !!options?.enabled,
    });
};
