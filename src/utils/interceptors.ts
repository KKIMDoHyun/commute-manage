import { AxiosInstance } from "axios";

import { instance } from "@/utils/axios-instance";

export function setInterceptors(axiosInstance: AxiosInstance) {
    // 요청 (request) interceptor
    axiosInstance.interceptors.request.use(
        // 요청을 보내기 전 수행할 작업
        (config) => {
            instance.defaults.headers["Authorization"] =
                sessionStorage.getItem("accessToken");
            return config;
        },
        // 오류 요청 가공
        (err) => {
            return Promise.reject(err);
        }
    );

    // 응답 (response) interceptor
    axiosInstance.interceptors.response.use(
        // 200 대 response 를 받아 응답 데이터를 가공하는 작업
        (res) => {
            // console.log("WEFEW", cookies);
            return res;
        },
        // 200 대 이외의 오류 응답을 가공
        async (err) => {
            const {
                config,
                response: { status },
            } = err;
            const originRequest = config;
            if (status === 401) {
                if (
                    err.response.data.message === "No Access Token" ||
                    err.response.data.message === "Expired Refresh Token" ||
                    err.response.data.message === "No Refresh Token"
                ) {
                    // 로그인 페이지 이동
                    sessionStorage.clear();
                    window.location.href = "/sign-in";
                } else {
                    // expired access token
                    try {
                        const { data } = await instance.post("/auth/refresh");

                        sessionStorage.setItem("accessToken", data.accessToken);
                        sessionStorage.setItem("isMaster", data.isMaster);
                        originRequest.headers.authorization = `Bearer ${data.accessToken}`;
                    } catch (error) {
                        console.log("AccessToken 재발급 에러");
                        throw new Error(err);
                    }

                    return instance(originRequest);
                }
            } else {
                return Promise.reject(err);
            }
        }
    );

    return axiosInstance;
}
