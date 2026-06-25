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

  fastify.get(
    "/skills",
    {
      preHandler: adminAuth,
    },
    skillController.getSkills
  );

  fastify.get(
    "/skills/:id",
    {
      preHandler: adminAuth,
    },
    skillController.getSkillById
  );

  fastify.put(
    "/skills/:id",
    {
      preHandler: adminAuth,
    },
    skillController.updateSkill
  );

  fastify.delete(
  "/skills/:id",
  {
    preHandler: adminAuth,
  },
  skillController.deleteSkill
);
}

module.exports = skillRoutes;