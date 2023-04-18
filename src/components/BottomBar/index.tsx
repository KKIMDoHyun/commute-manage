import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const path = [
    { route: "/", name: "홈" },
    { route: "/week", name: "주간" },
    { route: "/team", name: "팀" },
];
export const BottomBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <Outlet />
            <div className="flex-0 h-20 bg-slate-400 items-center justify-center">
                <div className="flex w-full h-full">
                    {path.map((v) => {
                        return (
                            <button
                                key={v.route}
                                className={`${
                                    location.pathname === v.route
                                        ? "flex w-full justify-center items-center bg-blue-200"
                                        : "flex w-full justify-center items-center bg-white"
                                }`}
                                onClick={() => {
                                    navigate(v.route);
                                }}
                            >
                                {v.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
