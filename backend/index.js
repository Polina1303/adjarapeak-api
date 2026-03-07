import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { EmailSender } from "./sendEmail.js";

const app = express();

app.use(
  cors({
    origin: ["https://www.adjarapeak.ge", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/send", async (req, res) => {
  try {
    const {
      name,
      phone,
      telegram,
      dateStart,
      dateEnd,
      comments,
      prod,
      desc,
      count,
      price,
    } = req.body;

    await EmailSender({
      name,
      phone,
      telegram,
      dateStart,
      dateEnd,
      comments,
      prod,
      desc,
      count,
      price,
    });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error("POST /send error:", error);
    return res.status(500).json({
      message: error?.message || "Email sending failed",
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on ${PORT}`);
});
