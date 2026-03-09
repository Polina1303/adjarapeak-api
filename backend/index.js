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
  console.log("📨 Получен запрос на /send");
  console.log("📦 Body:", req.body);

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

    // Проверим, что все данные пришли
    if (!name || !phone) {
      console.log("❌ Нет обязательных полей");
      return res.status(400).json({ msg: "Missing required fields" });
    }

    console.log("📧 Вызов EmailSender...");
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

    console.log("✅ Всё хорошо, отправляем ответ");
    res.json({ msg: "ok" });
  } catch (error) {
    console.error("❌ Ошибка в /send:", error);
    console.error("Детали ошибки:", {
      message: error.message,
      name: error.name,
    });

    // Отправляем детальный ответ об ошибке
    res.status(500).json({
      msg: "Error",
      error: error.message,
      details: error.toString(),
    });
  }
});

const PORT = process.env.PORT || 5000;
console.log("🚀 Запуск сервера...");
console.log("📡 ENV PORT =", process.env.PORT);
console.log("📧 Проверка переменных:");
console.log("- RESEND_API_KEY:", process.env.RESEND_API_KEY ? "✅" : "❌");
console.log(
  "- RECIPIENT_EMAIL:",
  process.env.RECIPIENT_EMAIL || "❌ (будет использован USER)"
);
console.log("- USER:", process.env.USER ? "✅" : "❌");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Сервер слушает на порту ${PORT}`);
});

export default app;
