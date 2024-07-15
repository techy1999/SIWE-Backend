import express, { Express, Request, Response } from "express";
import cors from "cors";
import Session from 'express-session';
import { configEnv } from './config/config.env';
import { HealthCheck } from "./types/response";
import authRouter from "./routes/auth.route";
import helmet from "helmet";

/**Swagger documentation */
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import { errorHandlingMiddleware, loggerMiddleware } from "./middleware/logginMiddleware";

/** CONFIGURE ENVIRONMENT VARIABLES */
configEnv();

/** CREATE EXPRESS APPLICATION INSTANCE*/
const app: Express = express();

/**  MIDDLEWARE TO READ JSON */
app.use(express.json());

/**Header optimization */
app.use(helmet());

// Use the logger middleware for all routes
app.use(loggerMiddleware);

app.use(cors())

app.use(Session({
    name: 'siwe-nounce',
    secret: process.env.SESSION_SECRET_KEY!,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true }
}));

app.use("/api/v1/docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));
app.use("/api/v1", authRouter);

/**  HEALTH CEHCK API ::/healthCheck */
app.use("/healthcheck", (req: Request, res: Response) => {

    const healthcheck: HealthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        return res.send(healthcheck);
    } catch (error) {
        if (typeof error === 'string') {
            healthcheck.message = error;
        } else if (error instanceof Error) {
            healthcheck.message = error.message;
        } else {
            healthcheck.message = 'An unknown error occurred';
        }
        return res.status(503).send({ error: healthcheck.message });
    }
});

/**  HANDING UNHANDLED ROUTES */
app.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
        error: "Route not found",
        message: "",
        httpStatus: 404,
        data: null,
    });
});

// Use the error handling middleware after all other routes and middleware
app.use(errorHandlingMiddleware);

export default app;

