import mongoose from "mongoose";

const clickLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    longUrl: String,
    shortCode: String,
    clickedAt: Date,
    ip: String,
    device: String,
    browser: String,
    location: {
      country: String,
      city: String
    }
  },
  {
    timestamps: true,
  }
);

export const Click = mongoose.model("urlModel", clickLogSchema);
