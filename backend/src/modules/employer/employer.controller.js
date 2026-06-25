const fs = require("fs");
const path = require("path");

const {
  saveCompanyInfoService, saveBusinessInfoService, uploadProfileImageService, getEmployerProfileService,
  updateEmployerProfileService, deleteEmployerProfileService,

  getLaboursService,

  contactLabourService, getContactHistoryService,
} = require("./employer.service");

const saveCompanyInfo = async (req, reply) => {
  try {
    const result =
      await saveCompanyInfoService(
        req.user.userId,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Company information saved successfully",
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

const saveBusinessInfo = async (req, reply) => {
  try {
    const result =
      await saveBusinessInfoService(
        req.user.userId,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Business information saved successfully",
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

const uploadProfileImage = async (request, reply) => {
  try {
    const data =
      await request.file();

    if (!data) {
      return reply
        .code(400)
        .send({
          success: false,
          message:
            "Image is required",
        });
    }

    const fileName =
      Date.now() +
      "-" +
      data.filename;

    const filePath =
      path.join(
        process.cwd(),
        "uploads/employer-images",
        fileName
      );

    await new Promise(
      (
        resolve,
        reject
      ) => {
        const writeStream =
          fs.createWriteStream(
            filePath
          );

        data.file.pipe(
          writeStream
        );

        writeStream.on(
          "finish",
          resolve
        );

        writeStream.on(
          "error",
          reject
        );
      }
    );

    const imageUrl =
      `/uploads/employer-images/${fileName}`;

    const result =
      await uploadProfileImageService(
        request.user.userId,
        imageUrl
      );

    return reply.send({
      success: true,
      message:
        "Profile image uploaded successfully",
      imageUrl,
      data: result,
    });
  } catch (error) {
    return reply
      .code(400)
      .send({
        success: false,
        message:
          error.message,
      });
  }
};

const getEmployerProfile = async (req, reply) => {
  try {
    const result =
      await getEmployerProfileService(
        req.user.userId
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

const updateEmployerProfile = async (req, reply) => {
  try {
    const result =
      await updateEmployerProfileService(
        req.user.userId,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Employer profile updated successfully",
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

const deleteEmployerProfile = async (req, reply) => {
  try {
    await deleteEmployerProfileService(
      req.user.userId
    );

    return reply.send({
      success: true,
      message:
        "Employer profile deleted successfully",
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message:
        error.message,
    });
  }
};

// get labours list with filter
const getLabours = async (req, reply) => {
    try {
      const result =
        await getLaboursService(
          req.query
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

  // contact creadities
const contactLabour = async (req, reply) => {
    try {
      const result =
        await contactLabourService(
          req.user.userId,
          req.body
        );

      return reply.send({
        success: true,
        message:
          result.alreadyContacted
            ? "Labour already unlocked"
            : "Labour unlocked successfully",
        remainingCredits:
          result.remainingCredits,
        data: result.labour,
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message:
          error.message,
      });
    }
  };


//contact history
const getContactHistory = async (req, reply) => {
    try {
      const result =
        await getContactHistoryService(
          req.user.userId
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


module.exports = {
  saveCompanyInfo,
  saveBusinessInfo,
  uploadProfileImage,
  getEmployerProfile,
  updateEmployerProfile,
  deleteEmployerProfile,
  getLabours,
  contactLabour,
  getContactHistory
};