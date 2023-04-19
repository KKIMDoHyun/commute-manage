import React from "react";
import { Route, Routes } from "react-router-dom";

import { BottomBar } from "@/components/BottomBar";
import { Home } from "@/pages/Home";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import { Team } from "@/pages/Team";
import { Week } from "@/pages/Week";
import { MasterRoute } from "@/routes/MasterRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { UnAuthRoute } from "@/routes/UnAuthRoute";

export const AppRoutes: React.FC = () => {
    return (
        <div className="flex flex-col flex-1">
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<BottomBar />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/week" element={<Week />} />
                        <Route
                            path="/team"
                            element={
                                <MasterRoute>
                                    <Team />
                                </MasterRoute>
                            }
                        />
                    </Route>
                </Route>
                <Route element={<UnAuthRoute />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
            </Routes>
        </div>
    );
};
