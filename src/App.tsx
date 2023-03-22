import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BottomBar } from "@/components/BottomBar";

import { AppRoutes } from "./routes/AppRoutes";

const queryClient = new QueryClient({
    defaultOptions: {
        // queries: {
        //     retry: 1,
        //     retryDelay: 0,
        //     // 1분으로 staleTime 지정하기
        //     staleTime: 1 * 60 * 1000,
        // },
        // mutations: {
        //     retry: 1,
        //     retryDelay: 0,
        // },
    },
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
