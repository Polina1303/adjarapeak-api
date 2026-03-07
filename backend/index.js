import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { EmailSender } from "./sendEmail.js";

console.log("BOOT: app starting...");
console.log("BOOT: process.env.PORT =", process.env.PORT);
console.log("BOOT: USER =", process.env.USER ? "exists" : "missing");
console.log("BOOT: PASSWORD =", process.env.PASSWORD ? "exists" : "missing");

const app = express();

const corsOptions = {
  origin: ["https://www.adjarapeak.ge", "http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/", (_, res) => {
  console.log("GET / called");
  res.status(200).send("API is running");
});

app.post("/send", async (req, res) => {
  try {
    console.log("POST /send called");
    await EmailSender(req.body);
    console.log("POST /send success");
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error("POST /send failed:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on ${PORT}`);
});

console.log("BOOT: PORT source value =", JSON.stringify(process.env.PORT));
console.log("BOOT: running on Railway =", !!process.env.RAILWAY_PROJECT_ID);
