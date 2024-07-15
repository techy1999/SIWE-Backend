import session from "express-session";
import { JwtPayload } from 'jsonwebtoken';

export = session;

declare module "express-session" {
    interface SessionData {
        nonce: string;
    }
}


declare module 'express-serve-static-core' {
    interface Request {
        decoded?: string | JwtPayload;
    }
}