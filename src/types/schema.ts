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
                    arrive_time: string | null;
                    created_at: string | null;
                    id: number;
                    leave_time: string | null;
                    todayDate: string;
                };
                Insert: {
                    arrive_time?: string | null;
                    created_at?: string | null;
                    id?: number;
                    leave_time?: string | null;
                    todayDate: string;
                };
                Update: {
                    arrive_time?: string | null;
                    created_at?: string | null;
                    id?: number;
                    leave_time?: string | null;
                    todayDate?: string;
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
