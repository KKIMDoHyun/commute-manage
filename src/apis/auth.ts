import { AuthType } from "@/types";
import { supabase } from "@/utils/supabase";

export const signUp = async (user: AuthType) => {
    const { data: userWidthEmail } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (userWidthEmail) {
        throw new Error("User with email exists");
    }

    const { data, error: signUpError } = await supabase.auth.signUp(user);

    if (signUpError) {
        throw signUpError;
    }
    return data;
};
