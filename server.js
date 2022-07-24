require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const refreshRoute = require("./routes/refresh");
const logoutRoute = require("./routes/logout");
const notificationsRoute = require("./routes/notifications");

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/GootalkDB"
);
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected.");
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "script-src": ["'self'", "https://countriesnow.space/api/v0.1/countries"],
      // "connect-src": "https://countriesnow.space/api/v0.1/countries",
    },
  })
);
app.use(morgan("common"));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);
app.use("/notifications", notificationsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running.");
});
