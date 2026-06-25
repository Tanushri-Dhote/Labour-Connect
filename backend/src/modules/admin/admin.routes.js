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

// labour managemnt
fastify.get(
  "/labours",
  {
    preHandler: adminAuth,
  },
  adminController.getAllLabours
);
fastify.get(
  "/labours/:id",
  {
    preHandler: adminAuth,
  },
  adminController.getLabourById
);

fastify.put(
  "/labours/:id/block",
  {
    preHandler: adminAuth,
  },
  adminController.blockLabour
);
fastify.put(
  "/labours/:id/unblock",
  {
    preHandler: adminAuth,
  },
  adminController.unblockLabour
);

fastify.put(
  "/labours/:id/status",
  {
    preHandler: adminAuth,
  },
  adminController.updateLabourStatus
);
}

module.exports = adminRoutes;