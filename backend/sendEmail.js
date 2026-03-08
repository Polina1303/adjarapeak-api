import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "0Auth2",
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
    host: "smtp.gmail.com",
    port: 465,
    tls: {
      rejectUnauthorized: false,
    },
    secure: true,
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("sent email");
    }
  });
};

export const EmailSender = ({
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
  const options = {
    from: process.env.USER,
    to: process.env.USER,
    subject: "ЗАКАЗ",
    html: `    <p>FullName: <b>${name}</b></p>
    <p>Phone: <b>${phone}</b></p>
    <p>Telegram: <b>${telegram}</b></p>
    <p>dateStart: <b>${dateStart}</b></p>
    <p>dateEnd: <i>${dateEnd}</i></p>
    <p>comments: <i>${comments}</i></p>
    <p>prod: <i>${prod}</i></p>
    <p>desc: <i>${desc}</i></p>
    <p>count: <i>${count}</i></p>
    <p>price: <i>${price}</i></p>`,
  };
  Email(options);
};
