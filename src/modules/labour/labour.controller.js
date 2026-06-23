const {
  savePersonalInfoService,  saveAddressInfoService, saveWorkInfoService, saveChargeInfoService,
  saveAvailabilityInfoService,saveExperienceInfoService,

} = require("./labour.service");

const fs = require("fs");
const path = require("path");
const LabourProfile = require("../../models/LabourProfile");

const uploadProfileImage = async (
  request,
  reply
) => {
  try {
    const data = await request.file();

    if (!data) {
      return reply.code(400).send({
        success: false,
        message: "Image is required",
      });
    }

    const fileName =
      Date.now() +
      "-" +
      data.filename;

    const filePath = path.join(
      process.cwd(),
      "uploads/profile-images",
      fileName
    );

    await new Promise(
      (resolve, reject) => {
        const writeStream =
          fs.createWriteStream(filePath);

        data.file.pipe(writeStream);

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
      `/uploads/profile-images/${fileName}`;

    const labourProfile =
      await LabourProfile.findOneAndUpdate(
        {
          userId:
            request.user.userId,
        },
        {
          profileImage:
            imageUrl,
        },
        {
          new: true,
        }
      );

    return reply.send({
      success: true,
      message:
        "Profile image uploaded successfully",
      imageUrl,
      data: labourProfile,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const savePersonalInfo = async (
  req,
  reply
) => {
  try {
    console.log("REQUEST USER:", req.user);
    console.log("REQUEST BODY:", req.body);

    const result =
      await savePersonalInfoService(
        req.user.userId,
        req.body
      );

    return reply.code(200).send({
      success: true,
      message:
        "Personal information saved successfully",
      data: result,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const saveAddressInfo = async (
  req,
  reply
) => {
  try {
    const result =
      await saveAddressInfoService(
        req.user.userId,
        req.body
      );

    return reply.code(200).send({
      success: true,
      message:
        "Address information saved successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const saveWorkInfo = async (req, reply) => {
  try {
    const result = await saveWorkInfoService(
      req.user.userId,
      req.body
    );

    return reply.send({
      success: true,
      message: "Work information saved successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const saveChargeInfo = async (req, reply) => {
  try {
    const result = await saveChargeInfoService(
      req.user.userId,
      req.body
    );

    return reply.send({
      success: true,
      message: "Charge information saved successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const saveAvailabilityInfo = async (
  req,
  reply
) => {
  try {
    const result =
      await saveAvailabilityInfoService(
        req.user.userId,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Availability saved successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const saveExperienceInfo = async (
  req,
  reply
) => {
  try {
    const result =
      await saveExperienceInfoService(
        req.user.userId,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Experience information saved successfully",
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
  savePersonalInfo,
  saveAddressInfo,
  saveWorkInfo,
 saveChargeInfo,
 saveAvailabilityInfo,
 saveExperienceInfo,
 uploadProfileImage
};




