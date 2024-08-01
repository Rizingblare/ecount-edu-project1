// // 프론트 - 백 DB데이터 통신 테스트 파일
const express = require("express");
const app = express();
const PORT = 5050;
const HOST = "172.29.12.151";

// CONFIG
const { Client } = require("pg");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://172.29.12.151:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// JSON 파싱 미들웨어
app.use(express.json());

const client = new Client({
  user: "postgres",
  host: "127.0.0.1", // TODO: 특정 IP주소 명시 옵션 설정
  database: "project1",
  password: "1234",
  port: 5432,
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
  console.log(`API 서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
});
