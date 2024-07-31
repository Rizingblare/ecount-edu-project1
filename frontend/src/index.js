const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const HOST = '0.0.0.0'; 

app.use(express.static((path.join(__dirname, './public'))));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, './public/main.html'));
});

// 클라이언트로부터 /api/data 요청을 받으면 Server B로 요청 전달
app.get('/api/transactions', async (req, res) => {
     try {
       const response = await axios.get('http://localhost:4000/transactionsTest'); // Server B로 요청 전달
       res.json(response.data); // Server B의 응답을 클라이언트에게 전달
     } catch (error) {
       res.status(500).send('Server Error');
     }
});

app.post('/api/transactions', async (req, res) => {
     try {
       const response = await axios.post('http://localhost:4000/transactionsTest'); // Server B로 요청 전달
       res.json(response.data); // Server B의 응답을 클라이언트에게 전달
     } catch (error) {
       res.status(500).send('Server Error');
     }
});
   
app.listen(PORT, HOST, () => {
console.log(`FrontEnd Server is running on http://localhost:${PORT}`);
});