const authController = require("./auth.controller");

async function authRoutes(fastify) {
  fastify.post(
    "/send-otp",
    authController.sendOtp
  );

  fastify.post(
    "/verify-otp",
    authController.verifyOtp
  );
}

module.exports = authRoutes;