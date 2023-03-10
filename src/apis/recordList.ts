import { supabase } from "../utils/supabase";

export const getCommuteRecordList = async () => {
    const { data: commuteRecordList } = await supabase
        .from("commute_time")
        .select("*")
        .order("created_at");
    return commuteRecordList;
};
