export const getTransactionData = async () => {
  const searchButton = document.querySelector(".search");

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
  });
};
