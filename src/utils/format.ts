const dayFormat: string[] = ["일", "월", "화", "수", "목", "금", "토", "일"];

export const DateFormat = (date: string) => {
    const time = new Date(date);
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} (${
        dayFormat[time.getDay()]
    })`;
};

export const TodayDateFormat = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const TimeFormat = (date: string) => {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
};
