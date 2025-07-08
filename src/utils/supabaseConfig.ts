
// Konfigurasi Supabase - bisa diedit sesuai kebutuhan
export const SUPABASE_CONFIG = {
  url: "https://tdqdlvyrqzokgalmzmof.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWRsdnlycXpva2dhbG16bW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzMyNzUsImV4cCI6MjA2NzU0OTI3NX0.YcwSWy0rSH8NZJpNK0fZ0WY57vXSnsXELThKwu1NScE"
};

// Helper function untuk fetch data dari Supabase
export const supabaseFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${SUPABASE_CONFIG.url}/rest/v1/${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
