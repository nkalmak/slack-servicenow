const { WebClient } = require("@slack/web-api");
const express = require("express");
const fetch = require("node-fetch");
const port = 8080;
const host = "localhost";

app = express();

app.use(express.json());

//Slack objects
const token = "slackToken";
const web = new WebClient(token);

app.post("/", async (req, res) => {
  let isBot = req.body.event.bot_id;
  let isThread = req.body.event.thread_ts;
  res.sendStatus(200);

  if (isBot) {
    return;
  }

  if (!isThread) {
    console.log("app mentioned");
    console.log(req.body);
    getincidentdetails(req.body.event.text, req.body.event.ts);
  }

  if (isThread) {
    console.log("app mentioned in thread");
    console.log(req.body);
    getincidentdetails(req.body.event.text, req.body.event.thread_ts);
  }

  console.log("Slack call finished");
});

app.listen(port, host, () => {
  console.log(`Started server on http:\\\\${host}:${port}`);
});

async function sendSlackResponse(data, tsValue, incidentNumber) {
  const str = JSON.stringify(data);
  // To do: parse data to readable format for Slack posts

  const text =
    "\n" +
    "<https://dev97948.service-now.com/incident.do?sys_id=" +
    incidentNumber +
    "|" +
    incidentNumber +
    ">" +
    "\n" +
    "\n" +
    strParse;

  await web.chat.postMessage({
    text: text,
    channel: "#api-calls",
    thread_ts: tsValue,
  });
}

function getincidentdetails(commentText, tsValue) {
  const regex1 = RegExp(/!INC\d{7}/);
  const resultsList = regex1.exec(commentText);
  if (resultsList == null) {
    return;
  }
  const incidentNumber = resultsList[0].slice(1);

  let header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic " + "authToken",
    },
    body: null,
  };

  fetch(
    "https://dev97948.service-now.com/api/451809/getincidentdetails/" +
      incidentNumber,
    header
  ).then(function (res) {
    if (res.status === 404) {
      console.log("No incident.");
    } else {
      res.json().then(function (data) {
        sendSlackResponse(data, tsValue, incidentNumber);
        console.log(data);
      });
    }
  });
}
