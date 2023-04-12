// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// import createAxiosInstance from "@/utils/axios-instance";

// export class APIClient {
//     private readonly client: AxiosInstance;

//     constructor() {
//         this.client = createAxiosInstance();
//     }

//     async get<R = unknown>(
//         url: string,
//         conf?: AxiosRequestConfig<any>
//     ): Promise<AxiosResponse<R>> {
//         try {
//             const res = await this.client.get(url, conf);
//             return res;
//         } catch (err: any) {
//             return err;
//         }
//     }

//     async post<D = unknown, R = unknown>(
//         url: string,
//         data?: D,
//         conf?: AxiosRequestConfig<any>
//     ): Promise<AxiosResponse<R>> {
//         try {
//             const res = await this.client.post(url, data, conf);
//             return res;
//         } catch (err: any) {
//             return err;
//         }
//     }

//     async patch<D = unknown, R = unknown>(
//         url: string,
//         data?: D,
//         conf?: AxiosRequestConfig<any>
//     ): Promise<AxiosResponse<R>> {
//         try {
//             const res = await this.client.patch(url, data, conf);
//             return res;
//         } catch (err: any) {
//             return err;
//         }
//     }

//     async put(
//         url: string,
//         data?: any,
//         conf?: AxiosRequestConfig<any>
//     ): Promise<any> {
//         try {
//             const res = await this.client.put(url, data, conf);
//             return res;
//         } catch (err) {
//             return err;
//         }
//     }

//     async delete<R = unknown>(
//         url: string,
//         conf?: AxiosRequestConfig<any>
//     ): Promise<AxiosResponse<R>> {
//         try {
//             const res = await this.client.delete(url, conf);
//             return res;
//         } catch (err: any) {
//             return err;
//         }
//     }
// }

// export const apiClient = new APIClient();
