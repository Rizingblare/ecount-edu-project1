export const getTransactionData = async () => {
  const searchButton = document.querySelector(".search");
  const resultSection = document.querySelector(".right");

  searchButton.addEventListener("click", async () => {
    const startYear = document.querySelector(".startYear").value;
    const startMonth = document.querySelector(".startMonth").value;
    const startDay = document.querySelector(".startDay").value;
    const endYear = document.querySelector(".endYear").value;
    const endMonth = document.querySelector(".endMonth").value;
    const endDay = document.querySelector(".endDay").value;

    const startDate = [startYear, startMonth, startDay].join("-");
    const endDate = [endYear, endMonth, endDay].join("-");

    const response = await fetch(
      `http://172.29.12.170:5050/transactions?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
      }
    );

    const jsonDate = await response.json();

    const monthData = jsonDate.response.summarys;
    const dayData = jsonDate.response.transactions;

    for (let singleData of dayData) {
      const newRow = document.createElement("div");
      newRow.className = "row";

      // 날짜 데이터 p 요소 생성
      const year = document.createElement("p");
      year.textContent = singleData.year;
      newRow.appendChild(year);

      const month = document.createElement("p");
      month.textContent = singleData.month;
      newRow.appendChild(month);

      const day = document.createElement("p");
      day.textContent = singleData.day;
      newRow.appendChild(day);

      const type = document.createElement("p");
      type.textContent = singleData.type === true ? "수입" : "지출";
      newRow.appendChild(type);

      const amount = document.createElement("p");
      amount.textContent = singleData.amount;
      newRow.appendChild(amount);

      const description = document.createElement("p");
      description.textContent = singleData.description;
      newRow.appendChild(description);

      // 새로운 div 요소를 .right 내부에 추가
      resultSection.appendChild(newRow);
    }
  });
};
