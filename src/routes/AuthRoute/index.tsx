import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type TAuthRoute = {
    auth: boolean;
};
export const AuthRoute: React.FC<TAuthRoute> = ({ auth }) => {
    const token = sessionStorage.getItem("accessToken");
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
