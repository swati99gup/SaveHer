import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendSOSMail = async (
  toEmail,
  userName,
  latitude,
  longitude
) => {
  try {
    const locationLink =
      `https://maps.google.com/?q=${latitude},${longitude}`;

    const { data, error } =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: toEmail,
        subject: "🚨 SOS EMERGENCY ALERT",
        text: `
🚨 EMERGENCY ALERT 🚨

${userName} may be in danger.

Live Location:
${locationLink}

Please contact immediately.
        `,
      });

    if (error) {
      console.error("RESEND ERROR:", error);
      throw error;
    }

    console.log(
      "Email Sent Successfully:",
      data
    );

    return data;
  } catch (err) {
    console.error(
      "Failed to send email:",
      err
    );
    throw err;
  }
};