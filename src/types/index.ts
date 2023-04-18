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

export type AuthType = {
    email: string;
    password: string;
};
