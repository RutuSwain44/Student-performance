import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nnxbijsjocibqlfsrizh.supabase.co";

const supabaseKey = "sb_publishable_8nrfbyTJ9dxurVm76Updkg_Jm25FZ7k";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);