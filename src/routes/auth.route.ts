import express, {  Request, Response } from "express";
import {
    getNounce,
    verifyMessage
} from "../controllers/v1/auth.controller";

import {
    getAccount
} from "../controllers/v1/account.controller";
import { authToken } from "../middleware/auth";


const authRouter = express.Router();


/**ROUTE  */
authRouter.route("/nonce").get(getNounce);
authRouter.route("/login").post(verifyMessage);
authRouter.route("/account").get( authToken, getAccount);


export default authRouter;
