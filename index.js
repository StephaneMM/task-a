const express = require("express");
const fs = require("fs");
const { PubSub } = require("@google-cloud/pubsub");

const app = express();
const port = 3000;

const projectId = "ms-and-eda-test";
const topicNameOrId = "projects/ms-and-eda-test/topics/balance-transactions";

// Initialize a Pub/Sub client
const pubsub = new PubSub({ projectId });

app.use(express.json());

// Task A (1)
app.post("/:retailUnitCode/:customerId", (req, res) => {
  const { retailUnitCode, customerId } = req.params;

  console.log(
    `Received event for Retail Unit ${retailUnitCode} and Customer ${customerId}`
  );

  (async function publishMessage(topicNameOrId, data) {
    
    const dataBuffer = Buffer.from(JSON.stringify(data));

    try {
      const messageId = await pubsub
        .topic(topicNameOrId)
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  })(topicNameOrId, req.body);

  res.status(200).send("Event received successfully");
});

// Task A (2)
app.get("/:retailUnitCode/:customerId/:activity/:year", (req, res) => {
  const { retailUnitCode, activity, year } = req.params;
  fs.readFile("public/task-a.sample.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData);
    const filteredData = jsonData.filter(
      (item) =>
        new Date(item.time).getFullYear() === Number(year) &&
        item.reason === activity &&
        item.market === retailUnitCode
    );

    (function calculateMonthlyBalance(year, filteredArray) {
      const monthlyBalances = {};

      // Initialize monthly balances object
      for (let month = 0; month < 12; month++) {
        const monthKey = new Date(year, month, 1).toLocaleString("default", {
          month: "long",
        });
        monthlyBalances[monthKey] = 0;
      }

      filteredArray.forEach((obj) => {
        const date = new Date(obj.time);
        const monthKey = date.toLocaleString("default", { month: "long" });

       
        if (obj.type === "INCREASED") {
          monthlyBalances[monthKey] += obj.value;
        } else if (obj.type === "DECREASED") {
          monthlyBalances[monthKey] -= obj.value;
        }
      });
      res.send(transformMonthlyBalancesWithOpening(monthlyBalances));
    })(year, filteredData);
  });
});


function transformMonthlyBalancesWithOpening(balances) {
  const transformedBalances = {};

  let prevMonthClosing = 0;

  Object.keys(balances).forEach((month) => {
    transformedBalances[month] = {
      openingBalance: prevMonthClosing,
      closingBalance: balances[month],
    };
    prevMonthClosing = balances[month];
  });

  return transformedBalances;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
