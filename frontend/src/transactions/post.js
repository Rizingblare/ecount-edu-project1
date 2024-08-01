document.addEventListener("DOMContentLoaded", () => {
  // 입력 필드 선택
  const newYear = document.querySelector(".newYear");
  const newMonth = document.querySelector(".newMonth");
  const newDay = document.querySelector(".newDay");
  const price = document.querySelector(".price");
  const description = document.querySelector(".description");
  const enrollButton = document.querySelector(".enroll");
  const transactionTypeInputs = document.querySelectorAll(
    'input[name="transactionType"]'
  );

  // 값 저장 객체
  let formData = {
    date: "",
    amount: 0,
    description: "",
  };

  // 입력 필드 변경 시 formData 업데이트
  newYear.addEventListener("input", updateDate);
  newMonth.addEventListener("input", updateDate);
  newDay.addEventListener("input", updateDate);
  price.addEventListener("input", (e) => {
    formData.amount = parseInt(e.target.value, 10);
  });
  description.addEventListener("input", (e) => {
    formData.description = e.target.value;
  });

  transactionTypeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      formData.type = input.value === "deposit";
    });
  });

  // 날짜 업데이트 함수
  function updateDate() {
    formData.date = `${newYear.value}-${newMonth.value.padStart(
      2,
      "0"
    )}-${newDay.value.padStart(2, "0")}`;
  }

  // + 버튼 클릭 시
  enrollButton.addEventListener("click", () => {
    console.log("요청 data: ", JSON.stringify(formData));

    // 유효성 검사
    if (!formData.date || isNaN(formData.amount) || !formData.description) {
      alert("모든 필드를 올바르게 입력하세요.");
      return;
    }

    // POST
    // 본인 ip로 변경하여 사용
    fetch("http://172.29.12.170:5050/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
