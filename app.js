const express = require("express");
const Http = require("http");
const Https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("./cert/rootca.key"),
  cert: fs.readFileSync("./cert/rootca.crt"),
};

const cookieParser = require("cookie-parser");
const requestMiddleware = require("./middlewares/requestMiddleware");
const router = require("./routes");

const app = express();
const http = Http.createServer(app);
const https = Https.createServer(options, app);

const cors = require("cors");
const httpPort = 3000;
const httpsPort = 3443;

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
  console.log(`Server is running on port ${req.secure ? httpsPort : httpPort}`);
  res.send("hello wonjin world");
});

http.listen(httpPort, () => {
  console.log(httpPort, "포트로 서버가 열렸어요!");
});

https.listen(httpsPort, () => {
  console.log(httpsPort, "포트로 서버가 열렸어요!");
});
