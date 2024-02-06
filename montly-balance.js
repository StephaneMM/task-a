// const fs = require("fs");

// const filePath = "public/task-a.sample.json";
// const targetDate = "2022";

// async function initializeData() {
//   try {
//     const data = await fs.readFile(filePath, "utf8", (err, data) => {
//       JSON.parse(data);
//     });
//     return data;
//   } catch (parseError) {
//     console.error("Error parsing JSON:", parseError);
//   }
// }

// function calculateMonthlyBalance(year, orderedArray) {
//   const monthlyBalances = {};

//   // Initialize monthly balances for each month of the year
//   for (let month = 0; month < 12; month++) {
//     const monthKey = new Date(year, month, 1).toLocaleString("default", {
//       month: "long",
//     });
//     monthlyBalances[monthKey] = 0;
//   }
//   console.log(orderedArray);
//   // Iterate through the array and update balances based on "type"
//   orderedArray.forEach((obj) => {
//     const date = new Date(obj.time);

//     // Find the month for the given date
//     const monthKey = date.toLocaleString("default", { month: "long" });

//     // Update the balance based on "type"
//     if (obj.type === "INCREASED") {
//       monthlyBalances[monthKey] += obj.value;
//     } else if (obj.type === "DECREASED") {
//       monthlyBalances[monthKey] -= obj.value;
//     }
//   });

//   return monthlyBalances;
// }

// // Example usage:
// const yourYear = 2024;
// const orderedArray = [
//   // ... (your ordered array goes here)
// ];

// module.exports = { initializeData, calculateMonthlyBalance };
