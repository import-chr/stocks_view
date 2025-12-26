import nodemailer from "nodemailer"
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
  const httpTemplate = WELCOME_EMAIL_TEMPLATE
    .replaceAll('{{name}}', name)
    .replaceAll('{{intro}}', intro);
  
  const mailOptions = {
    from: `Stox <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: `Welcome to Stox - your stock market toolkit is ready!`,
    text: 'Thanks for joining Stox',
    html: httpTemplate,  
  }

  await transporter.sendMail(mailOptions);
}
