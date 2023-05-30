require("dotenv").config();
const { checkAPI } = require("./middlewares/api_validation");
const express = require("express");

const app = express();
app.use(express.json());

const userRouter = require("./api/users/user.router");
<<<<<<< Updated upstream

app.use("/users", checkAPI, userRouter);
=======
const destinationRouter = require("./api/destinations/destination.router");
const restaurantRouter = require("./api/restaurants/restaurant.router");
>>>>>>> Stashed changes

app.get("/", (req, res) => {
  res.send("ISLAag Backend");
});
<<<<<<< Updated upstream
=======
// app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/users", checkAPI, userRouter);
app.use("/destinations", checkAPI, destinationRouter);
app.use("/restaurants", checkAPI, restaurantRouter);
>>>>>>> Stashed changes

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log("server 3000 running");
});
