import { Request, NextFunction, Response } from "express";
import authService from "../../services/v1/api/auth.service";

export const getNounce = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = await authService.getNonce(req);
    res.status(response.httpStatus).json(response);
};

export const verifyMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response = await authService.verifySign(req);
    res.cookie('token', response.data?.token, {
        expires: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5m day
        httpOnly: true,
    });
    res.status(response.httpStatus).json(response);
};
