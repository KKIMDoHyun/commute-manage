import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppRoutes } from "./routes/AppRoutes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            retryDelay: 0,
            // 1분으로 staleTime 지정하기
            staleTime: 1 * 60 * 1000,
        },
        mutations: {
            retry: 1,
            retryDelay: 0,
        },
    },
});
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
        </QueryClientProvider>
    );
};

export default App;
