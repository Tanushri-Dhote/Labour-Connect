const skillController = require("./skill.controller");

async function skillRoutes(
  fastify
) {
  fastify.get(
    "/list/:categoryId",
    skillController.getSkills
  );
}

module.exports = skillRoutes;