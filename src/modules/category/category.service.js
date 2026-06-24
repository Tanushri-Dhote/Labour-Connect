const Category = require("../../models/Category");

const createCategoryService = async (body) => {
  const { name } = body;

  const existing = await Category.findOne({
    name,
  });

  if (existing) {
    throw new Error(
      "Category already exists"
    );
  }

  return await Category.create({
    name,
  });
};

const getCategoriesService = async () => {
  return await Category.find().sort({
    createdAt: -1,
  });
};

const getCategoryByIdService = async (
  categoryId
) => {
  const category =
    await Category.findById(
      categoryId
    );

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  return category;
};

const updateCategoryService = async (
  categoryId,
  body
) => {
  const category =
    await Category.findById(
      categoryId
    );

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  const updatedCategory =
    await Category.findByIdAndUpdate(
      categoryId,
      body,
      {
        new: true,
      }
    );

  return updatedCategory;
};


// not permanant delete iactive this category
const deleteCategoryService = async (
  categoryId
) => {
  const category =
    await Category.findById(
      categoryId
    );

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  const updatedCategory =
    await Category.findByIdAndUpdate(
      categoryId,
      {
        status: "inactive",
      },
      {
        new: true,
      }
    );

  return updatedCategory;
};


module.exports = {
 createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
};