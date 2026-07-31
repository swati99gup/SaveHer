import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import SOS from "../models/SOS.js";
import {
  sendSOSMail
}
from "../services/emailService.js";
export const createSOS = async (req, res) => {
console.log("SOS API HIT",new Date());
  try {

    const { latitude, longitude } = req.body;

    // SAVE SOS
    const sos = await SOS.create({
      userId: req.user.id,
      latitude,
      longitude
    });

    // GET USER
     const user = await User.findById(req.user.id)
.select("name emergencyContacts");
    // SEND PUSH NOTIFICATION
    // POPULATE CONTACTS

const populatedUser =

  await User.findById(
    req.user.id
  ).populate(
    "emergencyContacts"
  );
// SEND TO ALL CONTACTS


for (

  const contact of
  populatedUser.emergencyContacts

) {

  if (contact.fcmToken) {

    await admin.messaging().send({

      token:
        contact.fcmToken,

      notification: {

        title:
          "🚨 SOS ALERT",

        body:
`${populatedUser.name}
may be in danger`
      },

      data: {

        latitude:
          latitude.toString(),

        longitude:
          longitude.toString()
      }
    });
  }
  await sendSOSMail(

  contact.email,

  populatedUser.name,

  latitude,

  longitude
);
    console.log(

      "Notification sent to:",

      contact.email
    );
  }    const locationLink =
      `https://maps.google.com/?q=${latitude},${longitude}`;

    const message = `
🚨 EMERGENCY ALERT 🚨

${user.name} may be in danger.

Location:
${locationLink}
`;

    // SEND RESPONSE
  res.json({
      message: "SOS Triggered Successfully",
      sos
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};
