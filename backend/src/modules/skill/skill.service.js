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

const getSkillsService = async () => {
  return await Skill.find({
    status: "active",
  })
    .populate("categoryId", "name")
    .sort({ createdAt: -1 });
};

const getSkillByIdService = async (
    skillId
) => {
    const skill =
        await Skill.findById(skillId)
            .populate(
                "categoryId",
                "name"
            );

    if (!skill) {
        throw new Error(
            "Skill not found"
        );
    }

    return skill;
};

const updateSkillService = async (
    skillId,
    body
) => {
    const {
        categoryId,
        name,
        status,
    } = body;

    const skill =
        await Skill.findById(skillId);

    if (!skill) {
        throw new Error(
            "Skill not found"
        );
    }

    if (categoryId) {
        const category =
            await Category.findById(
                categoryId
            );

        if (!category) {
            throw new Error(
                "Category not found"
            );
        }
    }

    const updatedSkill =
        await Skill.findByIdAndUpdate(
            skillId,
            {
                categoryId,
                name,
                status,
            },
            {
                new: true,
            }
        ).populate(
            "categoryId",
            "name"
        );

    return updatedSkill;
};

const deleteSkillService = async (
    skillId
) => {
    const skill =
        await Skill.findById(skillId);

    if (!skill) {
        throw new Error(
            "Skill not found"
        );
    }

    const updatedSkill =
        await Skill.findByIdAndUpdate(
            skillId,
            {
                status: "inactive",
            },
            {
                new: true,
            }
        ).populate(
            "categoryId",
            "name"
        );

    return updatedSkill;
};

const getActiveSkillsByCategoryService = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  return await Skill.find({ categoryId, status: "active" }).sort({ name: 1 });
};

module.exports = {
    createSkillService,
    getSkillsService,
    getSkillByIdService,
    updateSkillService,
    deleteSkillService,
    getActiveSkillsByCategoryService,
};