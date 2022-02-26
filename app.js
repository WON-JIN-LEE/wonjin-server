const express = require("express");
const Http = require("http");
const cookieParser = require("cookie-parser");
const requestMiddleware = require("./middlewares/requestMiddleware");
const router = require("./routes");

const app = express();
const http = Http.createServer(app);
const cors = require("cors");
const port = 3000;



const corsOptions = {
  origin: "클라이언트 도메인",
};

app.use(cors());
app.use(requestMiddleware);
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// route
app.use(router);

app.get("/", (req, res) => {
  res.send("hello wonjin world");
});

http.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
