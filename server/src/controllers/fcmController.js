import User from "../models/User.js";

export const saveFCMToken =
async (req, res) => {

  try {

    const { token } = req.body;

    await User.findByIdAndUpdate(

      req.user.id,

      {
        fcmToken: token
      }
    );

    res.json({

      message:
        "FCM Token Saved"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      error: err.message
    });
  }
};