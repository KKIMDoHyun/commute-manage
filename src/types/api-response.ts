type Status = "SUCCESS" | "ERROR";

export interface APIResponse<T = unknown> {
    status: Status;
    code: string;
    message: string;
    data: T;
}
