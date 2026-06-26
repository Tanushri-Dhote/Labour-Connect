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
    "/admins",
    {
      preHandler: adminAuth,
    },
    adminController.getAllAdmins
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


  // Employer Management

  fastify.get(
    "/employers",
    {
      preHandler: adminAuth,
    },
    adminController.getAllEmployers
  );

  fastify.get(
    "/employers/:id",
    {
      preHandler: adminAuth,
    },
    adminController.getEmployerById
  );

  fastify.put(
    "/employers/:id/block",
    {
      preHandler: adminAuth,
    },
    adminController.blockEmployer
  );

  fastify.put(
    "/employers/:id/unblock",
    {
      preHandler: adminAuth,
    },
    adminController.unblockEmployer
  );

  fastify.put(
    "/employers/:id/status",
    {
      preHandler: adminAuth,
    },
    adminController.updateEmployerStatus
  );

  // subscription
  fastify.post(
    "/subscription-plans",
    {
      preHandler: adminAuth,
    },
    adminController.createSubscriptionPlan
  );

  fastify.get(
    "/subscription-plans",
    {
      preHandler: adminAuth,
    },
    adminController.getAllSubscriptionPlans
  );

  fastify.get(
    "/subscription-plans/:id",
    {
      preHandler: adminAuth,
    },
    adminController.getSubscriptionPlanById
  );

  fastify.put(
    "/subscription-plans/:id",
    {
      preHandler: adminAuth,
    },
    adminController.updateSubscriptionPlan
  );

  fastify.delete(
    "/subscription-plans/:id",
    {
      preHandler: adminAuth,
    },
    adminController.deleteSubscriptionPlan
  );


  // platform setting
  fastify.get(
    "/settings",
    {
      preHandler: adminAuth,
    },
    adminController.getPlatformSettings
  );

  fastify.put(
  "/settings",
  {
      preHandler: adminAuth,
  },
  adminController.updatePlatformSettings
);
}

module.exports = adminRoutes;