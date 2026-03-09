import { Resend } from "resend";
import * as dotenv from "dotenv";
dotenv.config();

// Проверим, загрузился ли ключ
console.log(
  "🔑 RESEND_API_KEY загружен:",
  process.env.RESEND_API_KEY ? "✅ Да" : "❌ Нет"
);

const resend = new Resend(process.env.RESEND_API_KEY);

export const EmailSender = async ({
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
}) => {
  console.log("📧 Попытка отправки email...");
  console.log("📨 Данные:", { name, phone, prod });

  try {
    const htmlContent = `
      <h2>Новый заказ с сайта</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Telegram:</strong> ${telegram}</p>
      <p><strong>Дата заезда:</strong> ${dateStart}</p>
      <p><strong>Дата выезда:</strong> ${dateEnd}</p>
      <p><strong>Товар/услуга:</strong> ${prod}</p>
      <p><strong>Описание:</strong> ${desc}</p>
      <p><strong>Количество:</strong> ${count}</p>
      <p><strong>Цена:</strong> ${price}</p>
      <p><strong>Комментарии:</strong> ${comments}</p>
    `;

    console.log("📤 Отправка через Resend...");

    const { data, error } = await resend.emails.send({
      from: "Заказы <onboarding@resend.dev>",
      to: [process.env.RECIPIENT_EMAIL || process.env.USER], // Используем RECIPIENT_EMAIL или старый USER
      subject: "НОВЫЙ ЗАКАЗ С САЙТА",
      html: htmlContent,
    });

    if (error) {
      console.error("❌ Resend ошибка:", error);
      throw error;
    }

    console.log("✅ Email отправлен успешно! ID:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Ошибка в EmailSender:", error);
    console.error("Детали ошибки:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    throw error; // Пробрасываем ошибку дальше
  }
};
