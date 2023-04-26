import axios, { AxiosInstance } from "axios";

import { setInterceptors } from "@/utils/interceptors";

const createInstance = () => {
    const instance: AxiosInstance = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3000",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
    });
    return setInterceptors(instance);
};
export const instance = createInstance();
