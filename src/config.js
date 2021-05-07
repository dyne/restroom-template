require("dotenv").config();

export const HTTP_PORT = parseInt(process.env.HTTP_PORT || "3000", 10);
export const HTTPS_PORT = parseInt(process.env.HTTPS_PORT || "8443", 10);
export const HOST = process.env.HOST || "0.0.0.0";
export const ZENCODE_DIR = process.env.ZENCODE_DIR;
export const OPENAPI = JSON.parse(process.env.OPENAPI || true);
