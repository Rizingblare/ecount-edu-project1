// serverB.js
const express = require('express');
const app = express();
const PORT = 4000; // Server B는 다른 포트를 사용
const HOST = '0.0.0.0';

app.get('/transactionTest', (req, res) => {
  // 여기에 데이터 처리 로직 추가
  res.json({ message: 'Hello from Server B' });
});

app.post('/transactionTest', (req, res) => {
    // 여기에 데이터 처리 로직 추가
    res.json({ message: 'Hello from Server B' });
  });

app.listen(PORT, HOST, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});