const express = require('express');
const app = express();

const PORT =  3000;
const HOST = '0.0.0.0'; 
const path = require('path');

app.use(express.static('public'));

app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, 'public/main.html'));
});

app.listen(PORT, HOST, () => {
     console.log(`프론트엔드 API 서버가 실행 중입니다. http://localhost:${PORT} `);
});
