const skillController = require("./skill.controller");
const adminAuth = require("../../middleware/adminAuth.middleware");

async function skillRoutes(fastify) {
  fastify.post(
    "/skills",
    {
      preHandler: adminAuth,
    },
    skillController.createSkill
  );
}

module.exports = skillRoutes;