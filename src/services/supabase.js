import { createClient } from "@supabase/supabase-js";

export const supabase_url = "https://xsylytolnkdkzlkwmjai.supabase.co";
const supabase_key = import.meta.env.VITE_SUPABASE_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabase_url, supabase_key);

export default supabase;
