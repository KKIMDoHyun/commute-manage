import React from "react";
import { useNavigate } from "react-router";

export const BottomBar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-0 h-20 bg-slate-400 items-center justify-center">
            <div className="flex w-full h-full">
                <button
                    className="flex w-full justify-center items-center bg-slate-200"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    홈
                </button>
                <button
                    className="flex w-full justify-center items-center bg-slate-300"
                    onClick={() => {
                        navigate("/week");
                    }}
                >
                    주간보기
                </button>
            </div>
        </div>
    );
};
