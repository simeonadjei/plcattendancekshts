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
      code: form.get('code')
    };

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbywG3WFQYtsrixlYXOe-O_sMSllbe4kGMMu8BUTNtJmVczfXE7fps_5GT26iMVtH16A/exec';
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(scriptUrl)}`;

    try {
      const res = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)  // Direct payload
      });

      const data = await res.json();
      setStatus(data.status || JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h1>PLC Attendance</h1>
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
