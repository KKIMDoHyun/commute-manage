import React from "react";
import { Navigate } from "react-router-dom";

import { getCookies } from "@/utils/Cookies";

type TMasterRoute = {
    children: JSX.Element;
};
export const MasterRoute: React.FC<TMasterRoute> = ({ children }) => {
    const isMaster = getCookies("isMaster");
    if (isMaster === "true") {
        return children;
    }
    return <Navigate to="/" />;
};
