import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home";
import { Week } from "@/pages/Week";

export const AppRoutes = () => {
    return (
        <div className="flex-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/week" element={<Week />} />
            </Routes>
        </div>
    );
};
