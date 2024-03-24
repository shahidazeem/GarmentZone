const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email is already exist!"],
    required: [true, "Email is requaired."],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: {
    type: String,
    select: false,
  },
  emailVerificationCodeExpiry: {
    type: Date,
    select: false,
  },
  password: {
    type: String,
    minlength: [8, "Password must contain 8 or more characters."],
    required: [true, "Password is required."],
    select: false,
    // validate:
  },
  token: {
    type: String,
  },
});

userSchema.methods.createEmailVerifyToken = async function () {
  let token;

  do {
    token = ((Math.floor(1000 * Math.random() * 9000))%10000).toString();
  } while (
    await userModel.findOne({
      emailVerificationCode: crypto
        .createHash("sha256")
        .update(token)
        .digest("hex"),
    })
  );

  this.emailVerificationCode = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.emailVerificationCodeExpiry = Date.now() + 10 * 60 * 1000;

  return token;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
