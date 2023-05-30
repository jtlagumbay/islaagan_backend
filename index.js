require("dotenv").config();
const { checkAPI } = require("./middlewares/api_validation");
const express = require("express");

const app = express();
app.use(express.json());

const userRouter = require("./api/users/user.router");
const destinationRouter = require("./api/destinations/destination.router");

app.get("/", (req, res) => {
  res.send("ISLAagan Backend");
});
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/users", checkAPI, userRouter);
app.use("/destinations", checkAPI, destinationRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log("server 3000 running");
});
