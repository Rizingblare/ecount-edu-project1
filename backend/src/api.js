const express = require("express");
const app = express();
const PORT = 5050;
const HOST = "172.29.12.151";

// CONFIG
const { Client, types } = require("pg");

// JSON 파싱 미들웨어 (프론트 요청 데이터를 api서버에 전달하기 위함)
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://172.29.12.151:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

app.get(`/transactions`, async (req, res) => {
  // ?startDate={startDate}&endDate={endDate}

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // console.log(startDate); //2024-04-21
  // console.log(endDate);

  try {
    // dto
    const result = {
      success: true,
      response: {
        summarys: [],
        transactions: [],
      },
    };

    const query = `SELECT * FROM Transactions WHERE DATE BETWEEN '${startDate}' AND '${endDate}' ORDER BY DATE`;
    const queryResult = await client.query(query);

    for (let obj of queryResult.rows) {
      // const dateInfo = new Date(obj.date).toISOString().split("T")[0];
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

    // const startMonth = startDate.slice(0, 7); // 2024-04
    // const endMonth = endDate.slice(0, 7); // 2024-06
    // const queryForMonth = `
    //   SELECT TO_CHAR(date, 'YYYY-MM') as date, SUM(amount) as total_price
    //   FROM Transactions
    //   WHERE date BETWEEN '${startDate}' AND '${endDate}'
    //   GROUP BY TO_CHAR(date, 'YYYY-MM')
    // `;
    // const monthQueryResult = await client.query(queryForMonth);
    // console.log(monthQueryResult.rows);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`API 서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다.`);
});
