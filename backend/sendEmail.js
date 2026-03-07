import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

console.log("MAIL STEP 1: file loaded");
console.log("MAIL STEP 2: USER exists =", !!process.env.USER);
console.log("MAIL STEP 3: PASSWORD exists =", !!process.env.PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

console.log("MAIL STEP 4: transporter created");

export const EmailSender = async (data) => {
  console.log("MAIL STEP 5: EmailSender called");
  return transporter.sendMail({
    from: process.env.USER,
    to: process.env.USER,
    subject: "ЗАКАЗ",
    html: `<p>test</p>`,
  });
};
