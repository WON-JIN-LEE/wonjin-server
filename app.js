const express = require("express");
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts");


// Request log
const requestMiddleware = (req, res, next) => {
  console.log("Request URL: ", req.originalUrl, "-", new Date());
  next();
};
app.use(requestMiddleware);
app.use(express.json()); // for parsing application/json 
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.use("/api", [postsRouter]);


app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
