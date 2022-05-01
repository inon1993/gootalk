require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const router = require("./routes/auth");

const routes = require("./routes/auth");

const app = express();

mongoose.connect("mongodb://localhost:27017/GootalkDB");
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected.");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server is running.");
});
