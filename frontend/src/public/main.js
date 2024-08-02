import { getTransactions } from "./api/get.js";
import { registerTransaction } from "./api/post.js";
//import { toggleMonthlyAggregation } from "./extension/monthlyToggle.js"

document.addEventListener("DOMContentLoaded", () => {
  getTransactions();
  registerTransaction();
  //toggleMonthlyAggregation();
});
