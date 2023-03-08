import React from "react";
import { useNavigate } from "react-router";

export const BottomBar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex w-full h-24 bg-slate-700 items-center">
            <button
                className="flex w-full h-full justify-center items-center bg-slate-400"
                onClick={() => {
                    navigate("/");
                }}
            >
                홈
            </button>
            <button
                className="flex w-full h-full justify-center items-center"
                onClick={() => {
                    navigate("/week");
                }}
            >
                주간보기
            </button>
        </div>
    );
};
