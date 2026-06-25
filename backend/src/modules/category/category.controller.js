const Category = require("../../models/Category");
const {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  getActiveCategoriesService,
} = require("./category.service");
const { getActiveSkillsByCategoryService } = require("../skill/skill.service");


const createCategory =
  async (request, reply) => {
    try {
      const category =
        await createCategoryService(
          request.body
        );

      return reply.send({
        success: true,
        message:
          "Category created successfully",
        data: category,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }
  };

const getCategories = async (
  req,
  reply
) => {
  try {
    const categories =
      await getCategoriesService();

    return reply.send({
      success: true,
      data: categories,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getCategoryById = async (
  req,
  reply
) => {
  try {
    const category =
      await getCategoryByIdService(
        req.params.id
      );

    return reply.send({
      success: true,
      data: category,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (
  req,
  reply
) => {
  try {
    const category =
      await updateCategoryService(
        req.params.id,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};


// not delete just inactive status
const deleteCategory = async (
  req,
  reply
) => {
  try {
    const category =
      await deleteCategoryService(
        req.params.id
      );

    return reply.send({
      success: true,
      message:
        "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getActiveCategories = async (req, reply) => {
  try {
    const categories = await getActiveCategoriesService();
    return reply.send({
      success: true,
      data: categories,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getActiveSkillsByCategory = async (req, reply) => {
  try {
    const skills = await getActiveSkillsByCategoryService(req.params.categoryId);
    return reply.send({
      success: true,
      data: skills,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getActiveCategories,
  getActiveSkillsByCategory,
};