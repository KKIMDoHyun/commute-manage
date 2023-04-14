import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
    defaultOptions: {},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CookiesProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
