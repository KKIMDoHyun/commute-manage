import dayjs from "dayjs";

export const dayFormat: string[] = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
    "일",
];

export const DateFormat = (date: string) => {
    return `${dayjs(date).format("YYYY-MM-DD")} (${
        dayFormat[dayjs(date).get("day")]
    })`;
};

export const TimeFormat = (date: string) => {
    return dayjs(date).format("HH:mm");
};
