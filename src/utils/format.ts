import dayjs from "dayjs";

const dayFormat: string[] = ["일", "월", "화", "수", "목", "금", "토", "일"];

export const DateFormat = (date: string) => {
    return `${dayjs(date).format("YYYY-MM-DD")} (${
        dayFormat[dayjs(date).get("day")]
    })`;
};

export const TodayDateFormat = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const TimeFormat = (date: string) => {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
};
