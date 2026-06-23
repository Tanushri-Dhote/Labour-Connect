const categoryController = require("./category.controller");

async function categoryRoutes(
  fastify
) {
  fastify.get(
    "/list",
    categoryController.getCategories
  );
}

module.exports = categoryRoutes;