const {
  createSkillService,
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

module.exports = {
  createSkill,
};