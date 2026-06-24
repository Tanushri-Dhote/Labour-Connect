const categoryController = require("./category.controller");
const adminAuth = require("../../middleware/adminAuth.middleware");

async function categoryRoutes(fastify) {

  fastify.post(
    "/categories",
    {
      preHandler: adminAuth,
    },
    categoryController.createCategory
  );

   fastify.get(
    "/categories",
    {
      preHandler: adminAuth,
    },
    categoryController.getCategories
  );

  fastify.get(
    "/categories/:id",
    {
      preHandler: adminAuth,
    },
    categoryController.getCategoryById
  );

  fastify.put(
  "/categories/:id",
  {
    preHandler: adminAuth,
  },
  categoryController.updateCategory
);

fastify.delete(
  "/categories/:id",
  {
    preHandler: adminAuth,
  },
  categoryController.deleteCategory
);
}

module.exports = categoryRoutes;