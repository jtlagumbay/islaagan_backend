require("dotenv").config();
const { checkAPI } = require("./middlewares/api_validation");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const userRouter = require("./api/users/user.router");
const destinationRouter = require("./api/destinations/destination.router");
const restaurantRouter = require("./api/restaurants/restaurant.router");
const accommodationRouter = require("./api/accommodations/accommodation.router");
const aquaticRouter = require("./api/aquatics/aquatic.router");

app.get("/", (req, res) => {
  res.send("ISLAagan Backend 2");
});

// app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/users", checkAPI, userRouter);
app.use("/destinations", checkAPI, destinationRouter);
app.use("/restaurants", checkAPI, restaurantRouter);
app.use("/accommodations", checkAPI, accommodationRouter);
app.use("/aquatics", checkAPI, aquaticRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log("server 3000 running");
});
