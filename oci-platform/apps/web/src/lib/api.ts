const API_BASE = process.env.NEXT_PUBLIC_OCI_API_URL || 'http://localhost:3333/api/v1';

export async function fetchBackendArticles() {
  try {
    const res = await fetch(`${API_BASE}/articles`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.articles || [];
  } catch (err) {
    return null;
  }
}

export async function checkAeoSample(query: string, engine: 'PERPLEXITY' | 'CHATGPT' | 'GEMINI' = 'PERPLEXITY') {
  try {
    const res = await fetch(`${API_BASE}/aeo/sample`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, engine }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}
