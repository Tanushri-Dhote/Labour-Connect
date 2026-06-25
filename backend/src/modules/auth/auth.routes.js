const authController = require("./auth.controller");
const authenticate = require("../../middleware/auth.middleware");

async function authRoutes(fastify) {
  fastify.post(
    "/send-otp",
    authController.sendOtp
  );

  fastify.post(
    "/verify-otp",
    authController.verifyOtp
  );

  fastify.post(
    "/select-role",
    {
      preHandler: authenticate,
    },
    authController.selectRoleController
  );
}

module.exports = authRoutes;