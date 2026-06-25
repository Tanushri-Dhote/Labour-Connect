const {
  createSkillService,
   getSkillsService,
    getSkillByIdService,
    updateSkillService,
    deleteSkillService,
} = require("./skill.service");

const createSkill = async (
  req,
  reply
) => {
  try {
    const skill =
      await createSkillService(
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getSkills = async (
  req,
  reply
) => {
  try {
    const skills =
      await getSkillsService();

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

const getSkillById = async (
  req,
  reply
) => {
  try {
    const skill =
      await getSkillByIdService(
        req.params.id
      );

    return reply.send({
      success: true,
      data: skill,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateSkill = async (
  req,
  reply
) => {
  try {
    const skill =
      await updateSkillService(
        req.params.id,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteSkill = async (
  req,
  reply
) => {
  try {
    const skill =
      await deleteSkillService(
        req.params.id
      );

    return reply.send({
      success: true,
      message:
        "Skill deleted successfully",
      data: skill,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill

};