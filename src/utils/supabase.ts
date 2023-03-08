import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { Database } from "../types/schema";

const SUPABASE_URL = "https://tvvxudxjywglxbimtmlh.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dnh1ZHhqeXdnbHhiaW10bWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyNzQ2NzksImV4cCI6MTk5Mzg1MDY3OX0.3aQq2Mm0pGtVqy2ArsCGusBzh1SFyJZoi-iB-6cKH0I";

export const supabase: SupabaseClient<any, "public", any> =
    createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
