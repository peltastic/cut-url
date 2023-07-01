import dotenv from "dotenv"
dotenv.config()

export default {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

