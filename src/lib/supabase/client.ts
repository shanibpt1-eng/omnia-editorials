import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yqrrikrhqgeqsoldumzc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_NNu_qejqIxURZFzrGTzwJw_6Ffeq1jI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
