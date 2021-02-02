import express from "express";
import chalk from "chalk";
import bodyParser from "body-parser";
import { ZENCODE_DIR, HTTP_PORT, HTTPS_PORT, HOST } from "./config";
import zencode from "@restroom-mw/core";
import ui from "@restroom-mw/ui";
import db from "@restroom-mw/db";
import httpmw from "@restroom-mw/http";
import sawroom from "@restroom-mw/sawroom";
import http from "http";
import https from "https";
import fs from "fs";

var privateKey = fs.readFileSync("ssl/selfsigned.key", "utf8");
var certificate = fs.readFileSync("ssl/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("morgan")("dev"));
app.set("json spaces", 2);

app.use(db);
app.use(sawroom);
app.use(httpmw);
app.use("/api/*", zencode);
app.use("/docs", ui({ path: "./zencode" }));
app.use("/one", ui({ path: "./zencode/one" }));
app.use("/two", ui({ path: "./zencode/two" }));

const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, HOST, () => {
  console.log(
    "Restroom started on " + chalk`{bold.blue http://0.0.0.0:${HTTP_PORT}}`
  );
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, HOST, () => {
  console.log(
    "Restroom started on " + chalk`{bold.blue https://0.0.0.0:${HTTPS_PORT}} \n`
  );
  console.log(`the ZENCODE directory is: ${chalk.magenta.underline(ZENCODE_DIR)} \n`);
  console.log( "To open Swagger go to: " + chalk`{bold.blue http://0.0.0.0:${HTTP_PORT}/docs}`);
});
