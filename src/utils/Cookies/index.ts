import { Cookies } from "react-cookie";

import { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

export const setCookies = (
    name: string,
    value: string,
    options?: CookieSetOptions | undefined
) => {
    return cookies.set(name, value, { ...options });
};

export const getCookies = (name: string) => {
    return cookies.get(name);
};
