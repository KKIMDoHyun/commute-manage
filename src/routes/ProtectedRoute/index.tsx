import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getCookies } from "@/utils/Cookies";

export const ProtectedRoute = ({ children }: any) => {
    const token = getCookies("Refresh");
    console.log(token);
    if (token) {
        return children ? children : <Outlet />;
    }
    return <Navigate to="/sign-in" />;
};
