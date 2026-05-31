import dotenv from "dotenv";
dotenv.config();

import SibApiV3Sdk from "@getbrevo/brevo";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const apiKey =
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;


export const sendSOSMail = async (
  toEmail,
  userName,
  latitude,
  longitude
) => {
  try {

    const locationLink =
      `https://maps.google.com/?q=${latitude},${longitude}`;

    const email = new SibApiV3Sdk.SendSmtpEmail();

    email.subject =
      "🚨 SOS EMERGENCY ALERT";

    email.htmlContent = `
      <h2>🚨 EMERGENCY ALERT 🚨</h2>

      <p>
        <strong>${userName}</strong>
        may be in danger.
      </p>

      <p>
        <strong>Live Location:</strong>
      </p>

      <a href="${locationLink}">
        Open Location
      </a>

      <br><br>

      <p>
        Please contact immediately.
      </p>
    `;

    email.sender = {
      name: "SaveHer",
      email: "swatigupta060605@gmail.com"
    };

    email.to = [
      {
        email: toEmail
      }
    ];

    const result =
      await apiInstance.sendTransacEmail(
        email
      );

    console.log(
      "Email Sent:",
      result.body
    );

  } catch (err) {

    console.error(
      "Failed to send email:",
      err
    );

    throw err;
  }
};