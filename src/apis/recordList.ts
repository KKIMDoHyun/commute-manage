import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { arriveTimeAtom, commuteRecordListAtom } from "../stores";
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
    const setCommuteRecordList = useSetAtom(commuteRecordListAtom);
    const setArriveTime = useSetAtom(arriveTimeAtom);

    return useQuery(["GET_COMMUTE_RECORD_LIST"], () => getCommuteRecordList(), {
        onSuccess: (res: any) => {
            if (res.length > 0) {
                const commuteRecordList = res.reverse();
                setCommuteRecordList(commuteRecordList);
                setArriveTime(commuteRecordList[0].arrive_time);
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });
};
