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

    fastify.get(
    "/profile",
    {
      preHandler: authenticate,
    },
    labourController.getLabourProfile
  );
  fastify.put(
  "/profile",
  {
    preHandler: authenticate,
  },
  labourController.updateLabourProfile
);

  fastify.delete(
    "/profile",
    {
      preHandler: authenticate,
    },
    labourController.deleteLabourProfile
  );

  fastify.patch(
    "/status",
    {
      preHandler: authenticate,
    },
    labourController.updateLabourStatus
  );

  fastify.patch(
    "/location",
    {
      preHandler: authenticate,
    },
    labourController.updateLabourLocation
  );

  fastify.get(
    "/search",
    {
      preHandler: authenticate,
    },
    labourController.searchLabours
  );

  fastify.post(
    "/upload-document",
    {
      preHandler: authenticate,
    },
    labourController.uploadRegistrationDocument
  );

  fastify.post(
    "/submit-registration",
    {
      preHandler: authenticate,
    },
    labourController.submitRegistration
  );
}


module.exports = labourRoutes;