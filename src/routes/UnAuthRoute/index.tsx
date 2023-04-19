import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getCookies } from "@/utils/Cookies";

export const UnAuthRoute = ({ children }: any) => {
    const token = getCookies("Refresh");
    if (!token) {
        return children ? children : <Outlet />;
    }
    return <Navigate to="/" />;
};
