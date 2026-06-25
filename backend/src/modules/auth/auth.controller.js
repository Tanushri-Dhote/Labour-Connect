const { sendOtpService ,  verifyOtpService, selectRoleService} = require("./auth.service");

const sendOtp = async (req, reply) => {
  try {
    console.log("========== SEND OTP API ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("==================================");

    const { mobileNumber } = req.body || {};

    if (!mobileNumber) {
      return reply.code(400).send({
        success: false,
        message: "Mobile number is required",
      });
    }

    const otp = await sendOtpService(mobileNumber);

    return reply.code(200).send({
      success: true,
      message: "OTP sent successfully",
      otp, // Remove after MSG91 integration
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return reply.code(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const verifyOtp = async (req, reply) => {
  try {
    console.log("VERIFY CONTROLLER START");

    const { mobileNumber, otp } = req.body;

    console.log("REQUEST DATA:", {
      mobileNumber,
      otp,
    });

    const result = await verifyOtpService(
      mobileNumber,
      otp
    );

    console.log("VERIFY RESULT:", result);

    return reply.code(200).send({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.log("VERIFY ERROR:", error);

    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const selectRoleController = async (request, reply) => {
  try {
    const { role } = request.body;

    const user = await selectRoleService(
      request.user.userId,
      role
    );

    return reply.send({
      success: true,
      message: "Role selected successfully",
      data: user,
    });
  } catch (error) {
    return reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  sendOtp,
  verifyOtp,
  selectRoleController,
};