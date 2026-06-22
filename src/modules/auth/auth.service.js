const OtpLog = require("../../models/OtpLog");
const User = require("../../models/User");
const generateOtp = require("../../utils/generateOtp");
const generateToken = require("../../utils/generateToken");

const sendOtpService = async (mobileNumber) => {
  const otp = generateOtp();

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 15);

  await OtpLog.create({
    mobile: mobileNumber,
    otp,
    expiresAt,
  });

  console.log("========== SAVE OTP ==========");
  console.log("Mobile:", mobileNumber);
  console.log("OTP:", otp);
  console.log("Expires At:", expiresAt);
  console.log("==============================");

  return {
    success: true,
    message: "OTP sent successfully",
    otp,
  };
};

const verifyOtpService = async (mobileNumber, otp) => {
  const otpRecord = await OtpLog.findOne({
    mobile: mobileNumber,
    otp,
    verified: false,
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    throw new Error("Invalid OTP");
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new Error("OTP has expired");
  }

  otpRecord.verified = true;
  await otpRecord.save();

  let user = await User.findOne({
    mobile: mobileNumber,
  });

  if (!user) {
    user = await User.create({
      mobile: mobileNumber,
    });
  }

  const token = generateToken({
    userId: user._id,
    mobile: user.mobile,
  });

  return {
    user,
    token,
  };
};

module.exports = {
  sendOtpService,
  verifyOtpService,
};