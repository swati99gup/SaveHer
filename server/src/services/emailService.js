import dotenv from "dotenv";
dotenv.config();
import nodemailer
from "nodemailer";

const transporter =

  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:process.env.EMAIL_USER,

      pass:process.env.EMAIL_PASS,
    }
  });
  

export const sendSOSMail =
async (

  toEmail,

  userName,

  latitude,

  longitude

) => {

  const locationLink =

`https://maps.google.com/?q=${latitude},${longitude}`;

  const mailOptions = {

    from:
      process.env.EMAIL_USER,

    to:
      toEmail,

    subject:
      "🚨 SOS EMERGENCY ALERT",

    text:

`🚨 EMERGENCY ALERT 🚨

${userName} may be in danger.

Live Location:
${locationLink}

Please contact immediately.`
  };

  await transporter.sendMail(
    mailOptions
  );

  console.log(
    "Email Sent To:",
    toEmail
  );
};
