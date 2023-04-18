import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getCookies } from "@/utils/Cookies";

export const ProtectedRoute = () => {
    const auth = getCookies("Authentication") ? true : false;
    return auth ? <Outlet /> : <Navigate to="sign-in" />;
};
