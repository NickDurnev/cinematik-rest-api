const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for user"] },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
    },
    locale: String,
    leftReview: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const User = model("users", UserSchema);

module.exports = User;
