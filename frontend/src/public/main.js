import { getTransactions } from "./api/get.js";
import { registerTransaction } from "./api/post.js";

document.addEventListener("DOMContentLoaded", () => {
  getTransactions();
  registerTransaction();
});
