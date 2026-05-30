import mongoose from "mongoose";

const sosSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  latitude: Number,

  longitude: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model(
  "SOS",
  sosSchema
);