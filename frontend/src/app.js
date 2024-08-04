// CONFIG
const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT =  3000;
const HOST = '0.0.0.0'; 


const networkInterfaces = os.networkInterfaces();
let serverIpAddress;

for (const interfaceName in networkInterfaces) {
  const addresses = networkInterfaces[interfaceName].filter(address => address.family === 'IPv4' && !address.internal);
  if (addresses.length > 0) {
    serverIpAddress = addresses[0].address;
    break;
  }
}
const serverUrl = `http://${serverIpAddress}:5050`;

app.use(express.static('public'));

app.get("/", (req, res) => {
     fs.readFile(path.join(__dirname, 'public', 'main.html'), 'utf8', (err, html) => {
       if (err) {
         res.status(500).send('Error loading page');
         return;
       }
   
       // HTML에 동적으로 IP 주소를 주입
       const modifiedHtml = html.replace(/<%= serverUrl %>/g, serverUrl);
       res.send(modifiedHtml);
     });
   });

app.listen(PORT, HOST, () => {
     console.log(`프론트엔드 API 서버가 실행 중입니다. http://localhost:${PORT} `);
});