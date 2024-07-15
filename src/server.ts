import app from "./app";
import logger from "./config/logger";

const PORT: Number = process.env.PORT ? parseInt(process.env.PORT) : 8000;


app.listen(PORT, () => {
    /**NOT NEEDED TO CONNECT DATABASE FOR NOW... */
    // connectDatabase();
    logger.info(
        `⚡️[server]: Server is running at http://localhost:${PORT} on ${process.pid}`
    );
});
