const labourController = require("./labour.controller");
const authenticate = require("../../middleware/auth.middleware");

async function labourRoutes(fastify) {

  fastify.post(
  "/upload-profile-image",
  {
    preHandler: authenticate,
  },
  labourController.uploadProfileImage
);

  fastify.post(
    "/personal-info",
    {
      preHandler: authenticate,
    },
    labourController.savePersonalInfo
  );

   fastify.post(
    "/address-info",
    {
      preHandler: authenticate,
    },
    labourController.saveAddressInfo
  );

  fastify.post(
  "/work-info",
  {
    preHandler: authenticate,
  },
  labourController.saveWorkInfo
);

fastify.post(
  "/charge-info",
  {
    preHandler: authenticate,
  },
  labourController.saveChargeInfo
);

fastify.post(
  "/availability-info",
  {
    preHandler: authenticate,
  },
  labourController.saveAvailabilityInfo
);

fastify.post(
  "/experience-info",
  {
    preHandler: authenticate,
  },
  labourController.saveExperienceInfo
);
}

module.exports = labourRoutes;