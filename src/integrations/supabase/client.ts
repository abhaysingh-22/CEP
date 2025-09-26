import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://mmnrtmkuueqohhaddtxc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tbnJ0bWt1dWVxb2hoYWRkdHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwOTk3NzIsImV4cCI6MjA0MjY3NTc3Mn0.bMxZPyqkWcjj0w7ue3pvHUAXWd3MH7Mb8aQRkLXhpJI";

// Debug: Log the environment variables (remove this after debugging)
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key (first 20 chars):', SUPABASE_PUBLISHABLE_KEY.substring(0, 20) + '...');

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});