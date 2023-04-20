import React from "react";
import { Navigate } from "react-router-dom";

type TMasterRoute = {
    children: JSX.Element;
};
export const MasterRoute: React.FC<TMasterRoute> = ({ children }) => {
    const isMaster = sessionStorage.getItem("isMaster");
    if (isMaster === "true") {
        return children;
    }
    return <Navigate to="/" />;
};
