import mongoose from "mongoose";

const userSchema =
new mongoose.Schema({

  name: String,

  email: String,

  phone: String,

  password: String,

  fcmToken: String,

  emergencyContacts: [

    {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"
    }
  ]
});

export default mongoose.model(
  "User",
  userSchema
);