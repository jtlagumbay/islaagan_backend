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
const itinerariesRouter = require("./api/itineraries/itinerary.router");
const itRestaurantRouter = require("./api/itRestaurants/itRestaurant.router");
const itAccommodationRouter = require("./api/itAccommodations/itAccommodation.router");
const itAquaticRouter = require("./api/itAquatics/itAquatic.router");

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
app.use("/itineraries", checkAPI, itinerariesRouter);
app.use("/itRestaurants", checkAPI, itRestaurantRouter);
app.use("/itAccommodations", checkAPI, itAccommodationRouter);
app.use("/itAquatics", checkAPI, itAquaticRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log("server 3000 running");
});
