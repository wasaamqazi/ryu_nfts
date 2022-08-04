// server/index.js

const express = require("express");
var fs = require("fs");
const https = require("https");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "2b0109d7bec55ce6703a",
  "c0747691dff26870caf2b45d64282a1d0bf35f66d224c3ed0bd32da2491e004f"
);
var Bottleneck = require("bottleneck/es5");
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});

const PORT = process.env.PORT || 3001;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/api", (req, res) => {
  let data = JSON.stringify(req.body);
  console.log(data);
  fs.writeFileSync("files/1.json", data);

  res.json({ message: "Hello" });
});
app.post("/getDomainList", async (req, res) => {
  console.log(req.body.url);

  const https = require("https");

  // Sample URL
  const url = req.body.url;
  limiter.schedule(() => {
    const request = https.request(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data = data + chunk.toString();
      });

      response.on("end", () => {
        console.log(data);
        res.json(data);
      });
    });

    request.on("error", (error) => {
      console.log("An error", error);
    });

    request.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
