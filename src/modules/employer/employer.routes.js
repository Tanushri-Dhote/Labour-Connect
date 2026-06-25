const employerController =
  require("./employer.controller");

const authenticate =
  require("../../middleware/auth.middleware");

async function employerRoutes(
  fastify
) {
  fastify.post(
    "/company-info",
    {
      preHandler:
        authenticate,
    },
    employerController.saveCompanyInfo
  );

  fastify.post(
  "/business-info",
  {
    preHandler:
      authenticate,
  },
  employerController.saveBusinessInfo
);

fastify.post(
  "/upload-profile-image",
  {
    preHandler:
      authenticate,
  },
  employerController.uploadProfileImage
);

fastify.get(
  "/profile",
  {
    preHandler:
      authenticate,
  },
  employerController.getEmployerProfile
);

fastify.put(
  "/profile",
  {
    preHandler:
      authenticate,
  },
  employerController.updateEmployerProfile
);

fastify.delete(
  "/profile",
  {
    preHandler:
      authenticate,
  },
  employerController.deleteEmployerProfile
);

// get with filters
fastify.get(
  "/labours",
  {
    preHandler:
      authenticate,
  },
  employerController.getLabours
);

// contact creadites
fastify.post(
  "/contact-labour",
  {
    preHandler:
      authenticate,
  },
  employerController.contactLabour
);

// contact history
fastify.get(
  "/contact-history",
  {
    preHandler:
      authenticate,
  },
  employerController.getContactHistory
);
}

module.exports =
  employerRoutes;