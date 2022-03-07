const app = require('./app');

const fs = require('fs');
const options = {
  key: fs.readFileSync('./cert/rootca.key'),
  cert: fs.readFileSync('./cert/rootca.crt'),
};

const Http = require('http');
const http = Http.createServer(app);
const httpPort = 3000;

// const Https = require('https');
// const https = Https.createServer(options, app);
const httpsPort = 3443;

app.get('/', (req, res) => {
  console.log(`Server is running on port ${req.secure ? httpsPort : httpPort}`);
  res.send('hello wonjin world');
});

http.listen(httpPort, () => {
  console.log(httpPort, '포트로 서버가 열렸어요!');
});

// https.listen(httpsPort, () => {
//   console.log(httpsPort, '포트로 서버가 열렸어요!');
// });
