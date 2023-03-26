export type SettingArriveTimeType = {
    todayDate: string;
    arrive_time: string;
};

export type SettingLeaveTimeType = {
    leave_time: string;
    work_time: number;
};

export type TCommuteRecordList = {
    id: number;
    created_at: string;
    todayDate: string;
    arrive_time: string;
    leave_time: string;
    work_time: string;
    AM: boolean;
};

export type SettingAnnualHolidayType = {
    todayDate: string;
    arrive_time: string;
    leave_time: string;
    work_time: number;
};

export type SettingAmHolidayType = {
    todayDate: string;
    arrive_time: string;
    AM: boolean;
};

export type SignUpType = {
    email: string;
    password: string;
};
