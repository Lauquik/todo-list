const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname));

function middleware(req, res, next) {
  req.url = "/";
  next();
}

app.use(middleware);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(5000, () => {
  console.log("listening on port 5000....");
});
