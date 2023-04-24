import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type TAuthRoute = {
    auth: boolean;
};
export const AuthRoute: React.FC<TAuthRoute> = ({ auth }) => {
    const [token, setToken] = useState<string | null>("");
    const lo = useLocation();
    useEffect(() => {
        setToken(sessionStorage.getItem("accessToken"));
    }, [lo.pathname]);
    // console.log("AuthRoute");
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
