import React from "react";
import { Navigate } from "react-router-dom";

import { getCookies } from "@/utils/Cookies";

export const MasterRoute = ({ children }: any) => {
    const isMaster = getCookies("isMaster");
    if (isMaster === "true") {
        return children;
    }
    return <Navigate to="/" />;
};
