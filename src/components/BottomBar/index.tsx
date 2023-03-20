import React from "react";
import { useLocation, useNavigate } from "react-router";

export const BottomBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="flex-0 h-20 bg-slate-400 items-center justify-center">
            <div className="flex w-full h-full">
                <button
                    // className="flex w-full justify-center items-center bg-slate-200"
                    className={`${
                        location.pathname === "/"
                    } ? "flex bg-slate-200" : flex w-full justify-center items-center`}
                    onClick={() => {
                        navigate("/");
                        console.log(location.pathname);
                    }}
                >
                    홈
                </button>
                <button
                    className={`${
                        location.pathname === "/week"
                    } ? "flex bg-slate-200" : flex w-full justify-center items-center`}
                    onClick={() => {
                        navigate("/week");
                        console.log(location.pathname);
                    }}
                >
                    주간보기
                </button>
            </div>
        </div>
    );
};
