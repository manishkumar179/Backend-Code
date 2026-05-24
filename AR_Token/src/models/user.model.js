const { default: mongoose } = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["google", "facebook"],
    },
    provider_id: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;