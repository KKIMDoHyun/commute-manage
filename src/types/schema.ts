export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            commute_time: {
                Row: {
                    AM: boolean | null;
                    arrive_time: string | null;
                    created_at: string | null;
                    id: number;
                    leave_time: string | null;
                    todayDate: string;
                    work_time: number | null;
                };
                Insert: {
                    AM?: boolean | null;
                    arrive_time?: string | null;
                    created_at?: string | null;
                    id?: number;
                    leave_time?: string | null;
                    todayDate: string;
                    work_time?: number | null;
                };
                Update: {
                    AM?: boolean | null;
                    arrive_time?: string | null;
                    created_at?: string | null;
                    id?: number;
                    leave_time?: string | null;
                    todayDate?: string;
                    work_time?: number | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
