const express = require("express");
const os = require("os");

// CONFIG
const { Client, types } = require("pg");
const app = express();

const networkInterfaces = os.networkInterfaces();
let serverIpAddress;

for (const interfaceName in networkInterfaces) {
  const addresses = networkInterfaces[interfaceName].filter(
    (address) => address.family === "IPv4" && !address.internal
  );
  if (addresses.length > 0) {
    serverIpAddress = addresses[0].address;
    break;
  }
}
const serverUrl = `http://${serverIpAddress}:5050`;
const PORT = 5050;
const HOST = serverIpAddress;

// JSON 파싱 미들웨어 (프론트 요청 데이터를 api서버에 전달하기 위함)
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const client = new Client({
  user: "postgres",
  host: "127.0.0.1", // TODO: 특정 IP주소 명시 옵션 설정
  database: "project1", // 개인 로컬 DB 적용
  password: "1234", // 개인 로컬 DB 적용
  port: 5432, // 개인 로컬 DB 적용
});

client.connect();

// CONTROLLOER
app.get("/", (req, res) => {
  client.query("SELECT * FROM transactions", (err, queryRes) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(queryRes.rows);
      res.json(queryRes.rows);
    }
  });
});

app.get(`/transactions`, async (req, res) => {
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  try {
    // dto
    const result = {
      success: true,
      response: {
        summarys: [],
        transactions: [],
      },
    };

    let blankFlag = false;
    if (startDate === "--" || endDate === "--") blankFlag = true;

    const query = blankFlag
      ? `SELECT * FROM Transactions ORDER BY DATE`
      : `SELECT * FROM Transactions WHERE DATE BETWEEN '${startDate}' AND '${endDate}' ORDER BY DATE`;
    const queryResult = await client.query(query);

    for (let obj of queryResult.rows) {
      const dateInfo = new Date(obj.date).toLocaleString("kr");
      const [year, month, day] = dateInfo.split(".").map(Number).slice(0, 11);
      const summaryDataArr = result.response.summarys;

      let addFlag = false;
      for (let summaryData of summaryDataArr) {
        if (summaryData.type === obj.type && summaryData.month === month) {
          addFlag = true;
          summaryData.amount += obj.amount;
        }
      }
      if (!addFlag) {
        summaryDataArr.push({
          year,
          month,
          type: obj.type,
          amount: obj.amount,
        });
      }

      console.log(obj);
      result.response.transactions.push({
        year: year,
        month: month,
        day: day,
        type: obj.type,
        amount: obj.amount,
        description: obj.description,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/transactions", async (req, res) => {
  const { type, date, amount, description } = req.body;
  console.log(type);

  try {
    const query =
      "INSERT INTO Transactions (date, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [date, type, amount, description];

    const result = await client.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`백엔드 API 서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
});
