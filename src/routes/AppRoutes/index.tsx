import React from "react";
import { Route, Routes } from "react-router-dom";

import { BottomBar } from "@/components/BottomBar";
import { Home } from "@/pages/Home";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import { Week } from "@/pages/Week";

export const AppRoutes = () => {
    return (
        <div className="flex flex-col flex-1">
            <Routes>
                <Route element={<BottomBar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/week" element={<Week />} />
                </Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </div>
    );
};
