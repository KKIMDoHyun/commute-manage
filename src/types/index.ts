export type SettingArriveTimeType = {
    todayDate: string;
    arrive_time: Date;
};

export type SettingLeaveTimeType = {
    leave_time: Date;
};

export type TCommuteRecordList = {
    id: number;
    created_at: string;
    todayDate: string;
    arrive_time: string;
    leave_time: string;
    work_time: string;
};
