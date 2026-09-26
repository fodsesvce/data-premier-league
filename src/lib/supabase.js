import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.warn('[DPL] VITE_SUPABASE_URL is not set. Admin and registration features will be unavailable.')
}

if (!supabaseAnonKey) {
  console.warn('[DPL] VITE_SUPABASE_ANON_KEY is not set. Admin and registration features will be unavailable.')
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
