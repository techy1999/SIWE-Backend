import { NextFunction } from "express";
import accountService from "../../services/v1/api/account.service";
import { Request, Response } from "express";

export const getAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = await accountService.infoAccount(req);
    res.status(response.httpStatus).json(response);
};
