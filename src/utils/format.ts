export const DateFormat = (date: string) => {
    const time = new Date(date);
    console.log(time);
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
};

export const TimeFormat = (date: string) => {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
};
