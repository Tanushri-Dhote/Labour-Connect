const {
  adminLoginService, getProfileService, getDashboardService, getAllLaboursService, getLabourByIdService,
    blockLabourService,  unblockLabourService,  updateLabourStatusService,
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

// labour managemnt
const getAllLabours = async (req, reply) => {
  try {
    const labours =
      await getAllLaboursService();

    return reply.send({
      success: true,
      data: labours,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getLabourById = async (
  req,
  reply
) => {
  try {
    const labour =
      await getLabourByIdService(
        req.params.id
      );

    return reply.send({
      success: true,
      data: labour,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const blockLabour = async (
  req,
  reply
) => {
  try {
    const result =
      await blockLabourService(
        req.params.id
      );

    return reply.send({
      success: true,
      message:
        "Labour blocked successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const unblockLabour = async (
  req,
  reply
) => {
  try {
    const result =
      await unblockLabourService(
        req.params.id
      );

    return reply.send({
      success: true,
      message:
        "Labour unblocked successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateLabourStatus = async (req, reply) => {
    try {
      const result =
        await updateLabourStatusService(
          req.params.id,
          req.body
        );

      return reply.send({
        success: true,
        message:
          "Labour status updated successfully",
        data: result,
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
  getAllLabours,
   getLabourById,
   blockLabour,
   unblockLabour,
   updateLabourStatus,
};