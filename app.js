const express = require("express");
const Http = require("http");
const socketIo = require("socket.io");
const usersRouter = require("./routes/users");
const boardsRouter = require("./routes/board");

const app = express();
const http = Http.createServer(app);
const cors = require("cors");

const io = socketIo(http, {
  cors: "*",
  methods: ["GET", "POST"],
});
const port = 3000;

// io.on("connection", (socket) => {
//   console.log("누군가 연결되었습니다..");

//   const payload = {
//     nickname: "서버가 보내준 구매자 닉네임",
//     goodsId: 10, // 서버가 보내준 상품 데이터 고유 ID
//     goodsName: "서버가 보내준 구매자가 구매한 상품 이름",
//     date: "서버가 보내준 구매 일시",
//   };
//   // socket.broadcast.emit("LIKE", payload);
//   io.emit("LIKE", payload);

//   socket.on("disconnect", () => {
//     console.log("누군가 연결이 끊어졌어요");
//   });
// });

//  Request log
const requestMiddleware = (req, res, next) => {
  console.log("Request URL: ", req.originalUrl, "-", new Date());
  next();
};

app.use(cors());
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

http.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
