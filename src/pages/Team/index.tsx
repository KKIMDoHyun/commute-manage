import React, { useState } from "react";

import { useGetTeamMemberList } from "@/apis/Team";
import { TTeamMember } from "@/types/Team";

export const Team = () => {
    const [teamMembers, setTeamMembers] = useState<TTeamMember | null>();
    const { isLoading, isError } = useGetTeamMemberList({
        onSuccess: (res: any) => {
            console.log(res);
            setTeamMembers(res);
        },
        enabled: true,
        staleTime: Infinity,
        cacheTime: Infinity,
    });
    if (isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                로딩중...
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                에러발생
            </div>
        );
    }
    return (
        <div className="flex flex-col w-full h-full justify-center items-center bg-slate-300">
            <span>{teamMembers?.name}</span>
            <div>
                {teamMembers?.subTeams.map((team) => {
                    return (
                        <div key={team.id}>
                            <span>{team.name}</span>
                            {team.user.map((u) => {
                                return (
                                    <div key={u.id}>
                                        {u.isMaster && <span>[팀장]</span>}
                                        <span>{u.name}</span>
                                        <span>{u.email}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            {/* {teamMembers.map((v) => {
                return (
                    <div key={v.id}>
                        <span>{v.name}</span>
                        {v.user.map((u) => {
                            return (
                                <div key={u.id}>
                                    <span>{u.name}</span>
                                </div>
                            );
                        })}
                    </div>
                );
            })} */}
        </div>
    );
};
