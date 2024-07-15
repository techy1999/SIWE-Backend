import { Request,Response,NextFunction } from 'express';
import logger from '../config/logger';

const loggerMiddleware = (req:Request, res:Response, next:NextFunction) => {
    // Log the incoming request
    logger.info(`[${req.method}] - [${req.url}]`, { timestamp: new Date().toISOString() });

    // Move to the next middleware or route handler
    next();
};

const errorHandlingMiddleware = (err: any, req: Request, res: Response, next:NextFunction) => {
    // Log the error
    logger.error(`Error: ${err.message}`, { stack: err.stack, timestamp: new Date().toISOString() });

    // Send a generic error response
    res.status(500).json({ error: 'Internal Server Error',message:"", data:null,httpStatus:500 });
};

export { loggerMiddleware, errorHandlingMiddleware };
