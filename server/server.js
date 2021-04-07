const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

// middleware
const auth = require("./middlewares/auth");

// Routes
const s3 = require("./routes/s3");
const users = require("./routes/users");
const gauth = require("./routes/gauth");

const connectDB = require("./config/db");
const configureAws = require("./config/aws");

dotenv.config({
  path: `./config/config.${process.env.NODE_ENV || "development"}.env`,
});
connectDB();
configureAws();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}
app.use("/api/v1/s3", s3);
app.use(auth);
app.use("/api/v1/users", users);
app.use("/api/v1/gauth", gauth);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
