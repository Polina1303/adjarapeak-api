import { Resend } from "resend";
import * as dotenv from "dotenv";
dotenv.config();

// Инициализация Resend с API ключом
const resend = new Resend(process.env.RESEND_API_KEY);

// Функция отправки email
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
  try {
    // Формируем HTML красивее (опционально)
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

    const { data, error } = await resend.emails.send({
      from: "Заказы <onboarding@resend.dev>", // Временно, потом заменишь на свой домен
      to: [process.env.USER], // Твой email получателя
      subject: "НОВЫЙ ЗАКАЗ С САЙТА",
      html: htmlContent,
    });

    if (error) {
      console.error("Ошибка отправки через Resend:", error);
      throw error;
    }

    console.log("Email отправлен успешно! ID:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("Ошибка в EmailSender:", error);
    throw error;
  }
};
