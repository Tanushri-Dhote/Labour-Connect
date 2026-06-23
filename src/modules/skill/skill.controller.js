const Skill = require("../../models/Skill");

const getSkills = async (
  req,
  reply
) => {
  const { categoryId } =
    req.params;

  const skills =
    await Skill.find({
      categoryId,
      status: true,
    });

  return reply.send({
    success: true,
    data: skills,
  });
};

module.exports = {
  getSkills,
};