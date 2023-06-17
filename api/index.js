const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("./db");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "root",
  pass: "root",
};

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/test", (req, res) => {
  res.json({ test: "ok" });
});

app.post("/gettodos", async (req, res) => {
  const gandu = await db.find(req.body.email);
  console.log(gandu);
  res.json({ arr: gandu[0].todos });
});

app.post("/savetodos", async (req, res) => {
  await db.update(req.body.email, req.body.todos);
  res.status(200).send();
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const user = await db.find(req.body.email);
  if (user) {
    res.json({ user: true, registered: false });
  } else {
    const password = await bcrypt.hash(req.body.pwd, 10);
    db.pushToDb({
      email: req.body.email,
      password: password,
      todos: [],
    });
    res.json({ user: false, registered: true });
  }
});

app.post("/auth", async (req, res) => {
  const user = await db.find(req.body.email);
  if (user) {
    await bcrypt
      .compare(req.body.password, user[0].password)
      .then((pass) => {
        if (pass) {
          console.log("hitted");
          res.json({ user: true, pwd: true });
        } else {
          res.json({ user: true, pwd: false });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    res.json({ user: false, pwd: false });
  }
});

app.listen(port, () => {
  console.log(process.env.MONGO_URL);
  console.log("gandu");
  console.log(`app is listening on port ${port}.....`);
});
