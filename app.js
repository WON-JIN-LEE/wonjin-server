const express = require("express");
const { Op } = require("sequelize");
const { User } = require("./models/index");

const usersRouter = require("./routes/users");
const boardsRouter = require("./routes/board");
const app = express();
const port = 3000;

//  Request log
const requestMiddleware = (req, res, next) => {
  console.log("Request URL: ", req.originalUrl, "-", new Date());
  next();
};
app.use(requestMiddleware);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 회원 route
app.use("/", usersRouter);

// 게시판 route
app.use("/post", [boardsRouter]);

app.get("/", (req, res) => {
  res.send("hello wonjin world");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
