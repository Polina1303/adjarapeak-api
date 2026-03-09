// import * as dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import { EmailSender } from "./sendEmail.js";

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://www.adjarapeak.ge", "http://localhost:3000"],
//   })
// );

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

// const PORT = process.env.PORT || 5000;
// console.log("ENV PORT =", process.env.PORT);
// app.listen(PORT, "0.0.0.0", () => {
//   console.log("listening on", PORT);
// });
// export default app;

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

//     // Добавляем await
//     await EmailSender({
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
//     console.error("Ошибка в /send:", error);
//     res.status(500).json({ msg: "Error" }); // Меняем 404 на 500 - это серверная ошибка
//   }
// });

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { EmailSender } from "./sendEmail.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["https://www.adjarapeak.ge", "http://localhost:3000"],
  })
);

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

    res.json({ msg: "ok" });
  } catch (error) {
    console.error("SEND ERROR:", error);
    res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

console.log("ENV PORT =", process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log("listening on", PORT);
});

export default app;
