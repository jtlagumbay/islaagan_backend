require("dotenv").config();
const { checkAPI } = require("./middlewares/api_validation");
const express = require("express");

const app = express();
app.use(express.json());

const userRouter = require("./api/users/user.router");

app.use("/users", checkAPI, userRouter);

app.get("/", (req, res) => {
  res.send("ISLAagan Backend");
});

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log("server 3000 running");
});
