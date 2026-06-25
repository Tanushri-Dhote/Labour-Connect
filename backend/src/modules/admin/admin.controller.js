const {
  adminLoginService, getProfileService, getDashboardService,
  // labour
  getAllLaboursService, getLabourByIdService, blockLabourService, unblockLabourService, updateLabourStatusService,
  // employer
  getAllEmployersService, getEmployerByIdService, blockEmployerService, unblockEmployerService, updateEmployerStatusService,
  // subscription
   createSubscriptionPlanService, getAllSubscriptionPlansService, getSubscriptionPlanByIdService,updateSubscriptionPlanService,
  deleteSubscriptionPlanService,


} = require("./admin.service");


// admin
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

// employer-managemnt

const getAllEmployers = async (req, reply) => {
  try {
    const employers =
      await getAllEmployersService();

    return reply.send({
      success: true,
      data: employers,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getEmployerById = async (req, reply) => {
  try {
    const employer =
      await getEmployerByIdService(
        req.params.id
      );

    return reply.send({
      success: true,
      data: employer,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const blockEmployer = async (req, reply) => {
  try {
    const employer =
      await blockEmployerService(
        req.params.id
      );

    return reply.send({
      success: true,
      message:
        "Employer blocked successfully",
      data: employer,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const unblockEmployer = async (req, reply) => {
  try {
    const employer =
      await unblockEmployerService(
        req.params.id
      );

    return reply.send({
      success: true,
      message:
        "Employer unblocked successfully",
      data: employer,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateEmployerStatus = async (req, reply) => {
  try {
    const employer =
      await updateEmployerStatusService(
        req.params.id,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Employer status updated successfully",
      data: employer,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

// subscription plan
const createSubscriptionPlan = async (req, reply) => {
    try {
      const result =
        await createSubscriptionPlanService(
          req.body
        );

      return reply.send({
        success: true,
        message:
          "Subscription plan created successfully",
        data: result,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message:
          error.message,
      });
    }
  };

const getAllSubscriptionPlans =async (req, reply) => {
    try {
      const result =
        await getAllSubscriptionPlansService();

      return reply.send({
        success: true,
        data: result,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message:
          error.message,
      });
    }
  };

  const getSubscriptionPlanById = async (req, reply) => {
    try {
      const result =
        await getSubscriptionPlanByIdService(
          req.params.id
        );

      return reply.send({
        success: true,
        data: result,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message:
          error.message,
      });
    }
  };

  const updateSubscriptionPlan = async (req, reply) => {
    try {
      const result =
        await updateSubscriptionPlanService(
          req.params.id,
          req.body
        );

      return reply.send({
        success: true,
        message:
          "Subscription plan updated successfully",
        data: result,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message:
          error.message,
      });
    }
  };

  const deleteSubscriptionPlan = async (req, reply) => {
    try {
      const result =
        await deleteSubscriptionPlanService(
          req.params.id
        );

      return reply.send({
        success: true,
        message:
          "Subscription plan deactivated successfully",
        data: result,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message:
          error.message,
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

  getAllEmployers,
  getEmployerById,
  blockEmployer,
  unblockEmployer,
  updateEmployerStatus,

  createSubscriptionPlan,
   getAllSubscriptionPlans,
   getSubscriptionPlanById,
   updateSubscriptionPlan,
   deleteSubscriptionPlan,
};