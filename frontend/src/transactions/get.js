export const getTransactionData = async () => {
  const searchButton = document.querySelector(".search");
  const resultSection = document.querySelector(".right");

  searchButton.addEventListener("click", async () => {
    resultSection.innerHTML = "";
    const header = document.createElement("div");
    header.classList.add("header");
    const dateHeader = document.createElement("span");
    dateHeader.textContent = "날짜";
    const typeHeader = document.createElement("span");
    typeHeader.textContent = "구분";
    const amountHeader = document.createElement("span");
    amountHeader.textContent = "금액";
    const desHeader = document.createElement("span");
    desHeader.textContent = "내용";
    header.append(dateHeader, typeHeader, amountHeader, desHeader);
    resultSection.appendChild(header);

    const startYear = document.querySelector(".startYear").value;
    const startMonth = document.querySelector(".startMonth").value;
    const startDay = document.querySelector(".startDay").value;
    const endYear = document.querySelector(".endYear").value;
    const endMonth = document.querySelector(".endMonth").value;
    const endDay = document.querySelector(".endDay").value;

    const startDate = [startYear, startMonth, startDay].join("-");
    const endDate = [endYear, endMonth, endDay].join("-");

    const response = await fetch(
      `http://172.29.12.151:5050/transactions?startDate=${startDate}&endDate=${endDate}`,
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
      // const year = document.createElement("span");
      // year.textContent = singleData.year;
      // newRow.appendChild(year);

      // const month = document.createElement("span");
      // month.textContent = singleData.month;
      // newRow.appendChild(month);

      // const day = document.createElement("span");
      // day.textContent = singleData.day;
      // newRow.appendChild(day);

      const date = document.createElement("span");
      date.textContent =
        singleData.year.toString() +
        "." +
        singleData.month.toString().padStart(2, "0") +
        "." +
        singleData.day.toString().padStart(2, "0");
      newRow.appendChild(date);

      const type = document.createElement("span");
      type.textContent = singleData.type === true ? "수입" : "지출";
      type.style.color = singleData.type === true ? "blue" : "red";
      newRow.appendChild(type);

      const amount = document.createElement("span");
      amount.textContent = parseInt(singleData.amount, 10).toLocaleString();
      newRow.appendChild(amount);

      const description = document.createElement("span");
      description.textContent = singleData.description;
      newRow.appendChild(description);

      // 새로운 div 요소를 .right 내부에 추가
      resultSection.appendChild(newRow);
    }
  });
};
