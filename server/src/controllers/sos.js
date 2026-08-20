import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import SOS from "../models/SOS.js";
import { sendSOSMail } from "../services/emailService.js";

export const createSOS = async (req, res) => {
  console.log("🚨 SOS API HIT", new Date());

  try {
    const { latitude, longitude } = req.body;

    console.log("📍 Location:", latitude, longitude);
    console.log("👤 User:", req.user?.id);

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Location is required"
      });
    }

    // 1. SAVE SOS IN DATABASE
    const sos = await SOS.create({
      userId: req.user.id,
      latitude,
      longitude
    });

    console.log("✅ SOS saved:", sos._id);

    // 2. GET USER WITH EMERGENCY CONTACTS
    const populatedUser = await User.findById(
      req.user.id
    ).populate("emergencyContacts");

    if (!populatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log(
      "👥 Emergency contacts:",
      populatedUser.emergencyContacts.length
    );

    // 3. SEND ALERTS
    for (const contact of populatedUser.emergencyContacts) {

      // ---------- FCM ----------
      if (contact.fcmToken) {
        try {

          await admin.messaging().send({
            token: contact.fcmToken,

            notification: {
              title: "🚨 SOS ALERT",
              body: `${populatedUser.name} may be in danger`
            },

            data: {
              latitude: String(latitude),
              longitude: String(longitude)
            }
          });

          console.log(
            "✅ FCM sent to:",
            contact.email
          );

        } catch (fcmError) {

          console.error(
            "❌ FCM failed for:",
            contact.email,
            fcmError.message
          );
        }
      } else {
        console.log(
          "⚠️ No FCM token for:",
          contact.email
        );
      }

      // ---------- EMAIL ----------
      try {

        await sendSOSMail(
          contact.email,
          populatedUser.name,
          latitude,
          longitude
        );

        console.log(
          "✅ Email sent to:",
          contact.email
        );

      } catch (emailError) {

        console.error(
          "❌ Email failed for:",
          contact.email,
          emailError.message
        );
      }
    }

    // 4. ALWAYS SEND RESPONSE
    return res.status(200).json({
      success: true,
      message: "SOS Triggered Successfully",
      sos
    });

  } catch (err) {

    console.error(
      "🔥 SOS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: "SOS failed",
      error: err.message
    });
  }
};
