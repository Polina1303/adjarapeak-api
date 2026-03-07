import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { EmailSender } from "./sendEmail.js";

const app = express();

const corsOptions = {
  origin: ["https://www.adjarapeak.ge", "http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (_, res) => {
  res.status(200).send("API is running");
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

    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error("SEND ERROR:", error);
    res.status(500).json({ message: "Error sending email." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on ${PORT}`);
});

export default app;
