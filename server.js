require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const refreshRoute = require("./routes/refresh");
const logoutRoute = require("./routes/logout");
const notificationsRoute = require("./routes/notifications");
const settingsRoutes = require("./routes/settings");
const commentRoutes = require("./routes/comment");

const app = express();

app.enable("trust proxy");

const PORT = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/GootalkDB"
);
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected.");
});

app.use(
  cors({
    origin: ["http://gootalk.herokuapp.com", "https://gootalk.herokuapp.com"],
    // origin: "true",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    // allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true,
    // exposedHeaders: ["*", "Authorization"],
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  helmet.contentSecurityPolicy({
    // useDefaults: true,
    directives: {
      // mediaSrc: ["data:"],
      // "default-src": ["'self'", "data:"],
      imgSrc: ["'self'", "https: data:"],
      mediaSrc: ["'*'", "data: http://res.cloudinary.com"],
      connectSrc: ["'self'", "https://countriesnow.space/api/v0.1/countries"],
    },
  })
);
app.use(morgan("common"));

app.use(function (request, response, next) {
  if (process.env.NODE_ENV === "production" && !request.secure) {
    return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);
app.use("/notifications", notificationsRoute);
app.use("/settings", settingsRoutes);
app.use("/comment", commentRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running.");
});
