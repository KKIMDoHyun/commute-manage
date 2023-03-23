import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BottomBar } from "@/components/BottomBar";

import { AppRoutes } from "./routes/AppRoutes";

const queryClient = new QueryClient({
    defaultOptions: {},
});
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col h-screen w-screen">
                <AppRoutes />
                <BottomBar />
            </div>
        </QueryClientProvider>
    );
};

export default App;
