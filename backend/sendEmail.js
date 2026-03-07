import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

console.log("MAIL: transporter init");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

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
    console.log("MAIL: send started");

    const info = await transporter.sendMail({
      from: process.env.USER,
      to: process.env.USER,
      subject: "ЗАКАЗ",
      html: `
        <p>FullName: <b>${name || ""}</b></p>
        <p>Phone: <b>${phone || ""}</b></p>
        <p>Telegram: <b>${telegram || ""}</b></p>
        <p>dateStart: <b>${dateStart || ""}</b></p>
        <p>dateEnd: <i>${dateEnd || ""}</i></p>
        <p>comments: <i>${comments || ""}</i></p>
        <p>prod: <i>${prod || ""}</i></p>
        <p>desc: <i>${desc || ""}</i></p>
        <p>count: <i>${count || ""}</i></p>
        <p>price: <i>${price || ""}</i></p>
      `,
    });

    console.log("MAIL: sent", info.messageId);
    return info;
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};
