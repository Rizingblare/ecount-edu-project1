import { getTransactionData } from "./transactions/get.js";
import { postNewData } from "./transactions/post.js";

document.addEventListener("DOMContentLoaded", () => {
  getTransactionData();
  postNewData();
});
