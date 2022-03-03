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
const httpsPort : number = 3443;

http.listen(httpPort, () => {
    console.log(httpPort, '포트로 서버가 열렸어요!');
});

// https.listen(httpsPort, () => {
//   console.log(httpsPort, '포트로 서버가 열렸어요!');
// });
