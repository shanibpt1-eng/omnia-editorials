import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yqrrikrhqgeqsoldumzc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcnJpa3JocWdlcXNvbGR1bXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MDg0NTEsImV4cCI6MjEwODA4NDQ1MX0.cZ0KQzKkm-DjznpVdhqZpoZXfEED6zqscbDAxWDhU-U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchLiveNewsArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.warn('[Supabase] Warning fetching articles:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase] Fallback to internal editorial cache');
    return null;
  }
}
