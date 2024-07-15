import dotenv from "dotenv";

/**  SETTING UP ENVIRONMENT */
export const configEnv = () => {
    if (process.env.NODE_ENV == "production") {
        dotenv.config({ path: "./.env.prod" });
    } else {
        dotenv.config({ path: "./.env.dev" });
    }
}

