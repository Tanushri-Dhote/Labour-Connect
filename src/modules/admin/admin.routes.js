const adminController =
  require("./admin.controller");

const adminAuth =
  require("../../middleware/adminAuth.middleware");

async function adminRoutes(
  fastify
) {
  fastify.post(
    "/login",
    adminController.login
  );

  fastify.get(
    "/profile",
    {
      preHandler: adminAuth,
    },
    adminController.getProfile
  );

  fastify.get(
  "/dashboard",
  {
    preHandler: adminAuth,
  },
  adminController.getDashboard
);
}

module.exports = adminRoutes;