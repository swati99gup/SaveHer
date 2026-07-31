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
  .select("name emergencyContacts")
  .populate("emergencyContacts");

// SEND TO ALL CONTACTS

await Promise.all(
  user.emergencyContacts.map(async (contact) => {
    const tasks = [];

    if (contact.fcmToken) {
      tasks.push(
        admin.messaging().send({
          token: contact.fcmToken,
          notification: {
            title: "🚨 SOS ALERT",
            body: `${user.name} may be in danger`,
          },
          data: {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          },
        })
      );
    }

    tasks.push(
      sendSOSMail(
        contact.email,
        user.name,
        latitude,
        longitude
      )
    );

    await Promise.all(tasks);
  })
);  

    const locationLink =
      `https://maps.google.com/?q=${latitude},${longitude}`;

    const message = `
🚨 EMERGENCY ALERT 🚨

${user.name} may be in danger.

Location:
${locationLink}
`;

    // SEND RESPONSE
    res.json({
    success: true,
    message: "SOS Triggered Successfully"
});

// Continue sending notifications and emails

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};
