import dotenv from "dotenv";
dotenv.config();
import nodemailer
from "nodemailer";
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS LENGTH:",
  process.env.EMAIL_PASS?.length
);
const transporter =
  nodemailer.createTransport({

 host: "smtp.gmail.com",
  port: 587,
  secure: false,
      auth: {

      user:process.env.EMAIL_USER,

      pass:process.env.EMAIL_PASS,
    },
     tls: {
    rejectUnauthorized: false,
  },
  });
  
transporter.verify(function (error, success) {
  if (error) {
    console.log("VERIFY ERROR:", error);
  } else {
    console.log("SMTP READY");
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
