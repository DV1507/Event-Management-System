import * as dotenv from "dotenv";
dotenv.config();
export const {
  JWT_SECRET,
  NODE_ENV = "development",
  PORT = 8000,
  FRONTEND_URL = "http://localhost:3000",
} = process.env;
