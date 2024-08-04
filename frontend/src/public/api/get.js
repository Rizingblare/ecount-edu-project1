export const getTransactions = async () => {
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
      `${window.SERVER_URL}/transactions?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
      }
    );

    const jsonDate = await response.json();

    const rowsMonthly = jsonDate.response.summarys;
    const rows = jsonDate.response.transactions;

    const isMonthly = document.getElementById("is-monthly").checked;

    if (!isMonthly) {
      for (let row of rows) {
        const newRow = document.createElement("div");
        newRow.className = "row";
  
        const date = document.createElement("span");
        date.textContent =
          row.year.toString() +
          "." +
          row.month.toString().padStart(2, "0") +
          "." +
          row.day.toString().padStart(2, "0");
        newRow.appendChild(date);
  
        const type = document.createElement("span");
        type.textContent = row.type === true ? "수입" : "지출";
        type.style.color = row.type === true ? "blue" : "red";
        newRow.appendChild(type);
  
        const amount = document.createElement("span");
        amount.textContent = parseInt(row.amount, 10).toLocaleString();
        newRow.appendChild(amount);
  
        const description = document.createElement("span");
        description.textContent = row.description;
        newRow.appendChild(description);
  
        // 새로운 div 요소를 .right 내부에 추가
        resultSection.appendChild(newRow);
      }
    } else {
      header.removeChild(desHeader);
      header.style.gridTemplateColumns = "1fr 1fr 2fr"
      header.append(dateHeader, typeHeader, amountHeader);
      resultSection.appendChild(header);

      for (let row of rowsMonthly) {
        const newRow = document.createElement("div");
        newRow.className = "row";
        newRow.style.gridTemplateColumns = "1fr 1fr 2fr"
  
        const date = document.createElement("span");
        date.textContent =
          row.year.toString() +
          "." +
          row.month.toString().padStart(2, "0");
        newRow.appendChild(date);
  
        const type = document.createElement("span");
        type.textContent = row.type === true ? "수입" : "지출";
        type.style.color = row.type === true ? "blue" : "red";
        newRow.appendChild(type);
  
        const amount = document.createElement("span");
        amount.textContent = parseInt(row.amount, 10).toLocaleString();
        newRow.appendChild(amount);
  
        // 새로운 div 요소를 .right 내부에 추가
        resultSection.appendChild(newRow);
      }
    }
  });
};
