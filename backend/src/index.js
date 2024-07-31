// 프론트 - 백 임시 연결 테스트용 파일
const express = require('express');
const app = express();
const path = require('path');
const PORT=5050
const HOST='0.0.0.0'


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://172.29.12.170:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/test', (req, res) => {
    res.json({name:'hi'});
  });

  app.listen(PORT, HOST, () => {
    console.log(`API 서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
  });