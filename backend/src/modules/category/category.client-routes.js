const categoryController = require("./category.controller");

async function categoryClientRoutes(fastify) {
  fastify.get(
    "/categories",
    categoryController.getActiveCategories
  );

  fastify.get(
    "/categories/:categoryId/skills",
    categoryController.getActiveSkillsByCategory
  );
}

module.exports = categoryClientRoutes;
