import * as dotenv from "dotenv";
dotenv.config();

console.log("STEP 1: dotenv loaded");

import express from "express";
console.log("STEP 2: express imported");

import cors from "cors";
console.log("STEP 3: cors imported");

import { EmailSender } from "./sendEmail.js";
console.log("STEP 4: sendEmail imported");

const app = express();
console.log("STEP 5: app created");

app.use(express.json());
console.log("STEP 6: express.json added");

app.get("/", (_, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5001;
console.log("STEP 7: PORT =", PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`STEP 8: listening on ${PORT}`);
});
