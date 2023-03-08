import React, { useState } from "react";

import "./App.css";
import { supabase } from "./utils/supabase";

function App() {
    const [count, setCount] = useState(0);
    const temp = async () => {
        try {
            const { data } = await supabase
                .from("commute_time")
                .select("arrive_time")
                .eq(
                    "todayDate",
                    new Date()
                        .toLocaleDateString()
                        .replace(/\./g, "")
                        .replace(/\s/g, "-")
                );

            if (data) {
                console.log(
                    "DATA",
                    new Date(data[0].arrive_time).toLocaleTimeString()
                );
            }
        } catch (err) {
            console.log(err);
        }
    };
    console.log(
        new Date().toLocaleDateString().replace(/\./g, "").replace(/\s/g, "-")
    );
    temp();
    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
