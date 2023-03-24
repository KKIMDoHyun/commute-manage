import React from "react";

import { supabase } from "@/utils/supabase";

export const SignIn = () => {
    const handleLoginBtn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "github",
            });
            console.log("AA", data);
            if (error) {
                console.log(error);
            } else {
                // navigate("/");
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <button onClick={handleLoginBtn}>깃헙 로그인</button>
        </div>
    );
};
