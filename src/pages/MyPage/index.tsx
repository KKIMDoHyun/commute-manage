import React from "react";
import { useNavigate } from "react-router-dom";

import { useSignOut } from "@/apis/Auth";

export const MyPage = () => {
    const navigate = useNavigate();
    const signOutMutation = useSignOut({
        onSuccess: (res: any) => {
            console.log(res);
            sessionStorage.removeItem("accessToken");
            navigate("/sign-in");
        },
        onError: (err: any) => {
            console.log(err);
        },
    });
    return (
        <div className="flex w-full h-full justify-center items-center">
            <button onClick={() => signOutMutation.mutate()}>
                <span className="text-lg">로그아웃</span>
            </button>
        </div>
    );
};
