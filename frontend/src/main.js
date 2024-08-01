document.addEventListener("DOMContentLoaded", () => {
  const fetchTest = async () => {
    const BASE_URL = "http://172.29.12.151:5050"; // 본인 ip로 변경하여 사용
    const response = await fetch(`${BASE_URL}/`);
    console.log(response);
    if (response.ok) {
      // alert(await((await (response.json())).name))

      // 테스트용
      console.log(await response.json());
    }
  };

  fetchTest();
});
