const express = require("express");
const cookieParser = require("cookie-parser");
const requestMiddleware = require("./middlewares/requestMiddleware");

const router = require("./routes");
const helmet = require("helmet");
const app = express();

const cors = require("cors");

app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy());

app.use(cors());
app.use(requestMiddleware);
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// route
app.use(router);

app.get("/", (req, res) => {
  res.status(200).send("hello wonjin world");
});

module.exports = app;
