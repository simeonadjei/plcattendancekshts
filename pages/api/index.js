export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const scriptUrl = process.env.NEXT_PUBLIC_SCRIPT_URL;
  const { payload } = req.body || {};
  
  if (!scriptUrl) return res.status(500).json({ error: 'Missing SCRIPT_URL' });
  if (!payload) return res.status(400).json({ error: 'Missing payload' });
  
  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
