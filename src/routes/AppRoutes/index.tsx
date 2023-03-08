import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "../../pages/Home";

export const AppRoutes = () => {
    return (
        <div className="flex h-full">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};
