"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require('cookie-parser');
const requestMiddleware = require('./middlewares/requestMiddleware');
const router = require('../routes');
const helmet = require('helmet');
const app = (0, express_1.default)();
const cors = require('cors');
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy());
app.use(cors());
app.use(requestMiddleware);
app.use(cookieParser());
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// route
app.use(router);
app.get('/', (request, response) => {
    response.status(200).send('hello wonjin world');
});
module.exports = app;
