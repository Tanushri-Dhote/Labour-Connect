const Skill = require("../../models/Skill");
const Category = require("../../models/Category");

const createSkillService = async (body) => {
  const { categoryId, name } = body;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const existing = await Skill.findOne({
    categoryId,
    name,
  });

  if (existing) {
    throw new Error("Skill already exists");
  }

  return await Skill.create({
    categoryId,
    name,
  });
};

module.exports = {
  createSkillService,
};