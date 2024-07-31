const express = require('express');
const app = express();
const PORT =  3000;
const path = require('path');
const HOST = '0.0.0.0'; 

// server.js 기준 절대경로
app.use(express.static(path.join(__dirname, '/')));

app.listen(PORT, HOST, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
});
