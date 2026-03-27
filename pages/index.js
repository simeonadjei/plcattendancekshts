const scriptUrl = 'https://script.google.com/macros/s/AKfycbywG3WFQYtsrixlYXOe-O_sMSllbe4kGMMu8BUTNtJmVczfXE7fps_5GT26iMVtH16A/exec';
const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(scriptUrl)}`;

const res = await fetch(proxyUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)  // Your form data
});
