import { Request, Response, NextFunction } from 'express';
//  Request log
const requestMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log('Request URL: ', request.originalUrl, '-', new Date());
    next();
};

module.exports = requestMiddleware;
