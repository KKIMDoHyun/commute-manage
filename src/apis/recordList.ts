import { useQuery } from "@tanstack/react-query";

import { supabase } from "../utils/supabase";

export const getCommuteRecordList = async () => {
    const { data, error } = await supabase
        .from("commute_time")
        .select("*")
        .limit(7)
        .order("created_at");
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useGetCommuteRecordList = () => {
    return useQuery(["GET_COMMUTE_RECORD_LIST"], () => getCommuteRecordList());
};
