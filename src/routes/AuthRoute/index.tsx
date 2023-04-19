import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getCookies } from "@/utils/Cookies";

type TAuthRoute = {
    auth: boolean;
};
export const AuthRoute: React.FC<TAuthRoute> = ({ auth }) => {
    const token = getCookies("Refresh");
    if (auth) {
        if (token) {
            return <Outlet />;
        }
        return <Navigate to="/sign-in" />;
    } else {
        if (!token) {
            return <Outlet />;
        }
        return <Navigate to="/" />;
    }
};
