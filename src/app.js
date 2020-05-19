import express from "express";
import chalk from "chalk";
import bodyParser from "body-parser";
import { ZENCODE_DIR, PORT, HOST } from "./config";
import zencode from "@restroom-mw/core";
import ui from "@restroom-mw/ui";
import db from "@restroom-mw/db";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("morgan")("dev"));
app.set("json spaces", 2);

app.use(db);
app.use("/api/*", zencode);
app.use("/docs", ui);

app.listen(PORT, HOST, () => {
  console.log(
    "Restroom started on " + chalk`{bold.blue http://0.0.0.0:${PORT}\n}`
  );
  console.log(`ZENCODE DIR: ${chalk.magenta.underline(ZENCODE_DIR)}\n`);
  console.log("Serving:\n");
});
