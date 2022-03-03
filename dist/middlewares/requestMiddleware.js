"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  Request log
const requestMiddleware = (request, response, next) => {
    console.log('Request URL: ', request.originalUrl, '-', new Date());
    next();
};
module.exports = requestMiddleware;
