require("dotenv").config();

export const PORT = parseInt(process.env.PORT || "3000", 10);
export const HOST = process.env.HOST || "0.0.0.0";
export const ZENCODE_DIR = process.env.ZENCODE_DIR;
