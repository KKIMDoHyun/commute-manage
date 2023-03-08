import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { BottomBar } from "./components/BottomBar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="flex h-full flex-col">
                <App />
                <BottomBar />
            </div>
        </BrowserRouter>
    </React.StrictMode>
);
