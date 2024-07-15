
import jwt from 'jsonwebtoken';
import  { Request, Response, NextFunction } from 'express';
import { createResponse } from '../utils/helper';

// Middleware function to verify JWT token
export const authToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        
        return res.status(401).json(createResponse("Unauthorized: Token not provided.", 401, "", null));
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (err, decoded) => {
        if (err) {
            return res.status(401).json(createResponse("Unauthorized: Invalid token.", 401, "", null));
        }
        req.decoded = decoded;
        next();
    });
}

