// server/index.js

const express = require("express");
var fs = require("fs");

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

  res.json({ message: "" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
