// import * as dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import { EmailSender } from "./sendEmail.js";

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5001;
// app.post("/send", async (req, res) => {
//   try {
//     const {
//       name,
//       phone,
//       telegram,
//       dateStart,
//       dateEnd,
//       comments,
//       prod,
//       desc,
//       count,
//       price,
//     } = req.body;

//     EmailSender({
//       name,
//       phone,
//       telegram,
//       dateStart,
//       dateEnd,
//       comments,
//       prod,
//       desc,
//       count,
//       price,
//     });
//     res.json({ msg: "ok" });
//   } catch (error) {
//     res.status(404).json({ msg: "Error" });
//   }
// });

// app.listen(PORT, () => console.log(`listening on ${PORT}`));

// export default app;

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

const PORT = process.env.PORT || 5001;

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
    res.status(500).json({ message: "Error sending email" });
  }
});

app.get("/", (_, res) => {
  res.send("API is running");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

export default app;
