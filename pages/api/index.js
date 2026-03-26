// api/index.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scriptUrl, path, payload } = req.body;

  if (!scriptUrl || !path) {
    return res.status(400).json({ error: 'scriptUrl and path are required' });
  }

  try {
    const url = `${scriptUrl}?${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {}),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Proxy error' });
  }
}

pages/index.js
<!-- pages/index.js -->
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      name: form.get('name'),
      department: form.get('department'),
      gender: form.get('gender'),
      year: form.get('year'),
      support: form.get('support'),
      rating: form.get('rating'),
      code: form.get('code'),
    };

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scriptUrl: process.env.NEXT_PUBLIC_SCRIPT_URL,
        path: 'submitAttendance=1',
        payload,
      }),
    });

    const data = await res.json();
    setStatus(data.status || 'error');
  };

  return (
    <div>
      <h1>PLC Attendance (Vercel)</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="department" placeholder="Department" required />
        <input name="gender" placeholder="Gender" required />
        <input name="year" placeholder="Year" required />
        <input name="support" placeholder="Support" />
        <input name="rating" placeholder="Rating" />
        <input name="code" placeholder="Daily Code" required />
        <button type="submit">Submit</button>
      </form>
      <p>Status: {status}</p>
    </div>
  );
}
