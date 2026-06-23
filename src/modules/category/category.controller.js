const Category = require("../../models/Category");

const getCategories = async (
  req,
  reply
) => {
  const categories =
    await Category.find({
      status: true,
    });

  return reply.send({
    success: true,
    data: categories,
  });
};

module.exports = {
  getCategories,
};