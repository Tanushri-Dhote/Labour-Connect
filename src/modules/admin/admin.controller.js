const {
  adminLoginService,getProfileService, getDashboardService,
} = require("./admin.service");

const login = async (
  request,
  reply
) => {
  try {
    const result =
      await adminLoginService(
        request.body
      );

    return reply.send({
      success: true,
      message:
        "Login successful",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (
  request,
  reply
) => {
  try {
    const admin =
      await getProfileService(
        request.admin.adminId
      );

    return reply.send({
      success: true,
      data: admin,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getDashboard = async (
  request,
  reply
) => {
  try {
    const data =
      await getDashboardService();

    return reply.send({
      success: true,
      data,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  login,
  getProfile,
  getDashboard,
};