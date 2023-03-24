import React from "react";

import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <AppRoutes />
        </div>
    );
};

export default App;
