const app = require('./app');

const Http = require('http');
const http = Http.createServer(app);

const port = 3000;

http.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
