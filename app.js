require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const userRouter = require("./api/users/user.router");

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log("server 3000 running");
});
