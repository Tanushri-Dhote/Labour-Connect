const {
  savePersonalInfoService,
  saveAddressInfoService,
  saveWorkInfoService,
  saveChargeInfoService,
  saveAvailabilityInfoService,
  saveExperienceInfoService,
  getLabourProfileService,
  deleteLabourProfileService,
  updateLabourProfileService,
  updateLabourStatusService,
  updateLabourLocationService,
  searchLaboursService,
  submitRegistrationService,
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
      path.basename(data.filename);

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

const getLabourProfile = async (req, reply) => {
  try {
    const result = await getLabourProfileService(req.user.userId);

    return reply.code(200).send({
      success: true,
      message: "Labour profile fetched successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateLabourProfile = async (
  req,
  reply
) => {
  try {
    const result =
      await updateLabourProfileService(
        req.user.userId,
        req.body
      );

    return reply.send({
      success: true,
      message:
        "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteLabourProfile = async (req, reply) => {
  try {
    const result = await deleteLabourProfileService(req.user.userId);

    return reply.code(200).send({
      success: true,
      message: "Labour profile deleted successfully",
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
    const { isOnline } = req.body;
    if (isOnline === undefined) {
      return reply.code(400).send({
        success: false,
        message: "isOnline field is required",
      });
    }

    const result = await updateLabourStatusService(req.user.userId, isOnline);
    return reply.send({
      success: true,
      message: "Status updated successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateLabourLocation = async (req, reply) => {
  try {
    const result = await updateLabourLocationService(req.user.userId, req.body);
    return reply.send({
      success: true,
      message: "Location updated successfully",
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const searchLabours = async (req, reply) => {
  try {
    const result = await searchLaboursService(req.query);
    return reply.send({
      success: true,
      data: result,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const uploadRegistrationDocument = async (request, reply) => {
  try {
    const data = await request.file();

    if (!data) {
      return reply.code(400).send({
        success: false,
        message: "Document file is required",
      });
    }

    const fileName = Date.now() + "-" + path.basename(data.filename);
    const dirPath = path.join(process.cwd(), "uploads/registration-documents");
    
    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, fileName);

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      data.file.pipe(writeStream);
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    const documentUrl = `/uploads/registration-documents/${fileName}`;

    const labourProfile = await LabourProfile.findOneAndUpdate(
      { userId: request.user.userId },
      { documentUrl },
      { new: true }
    );

    if (!labourProfile) {
      return reply.code(400).send({
        success: false,
        message: "Please complete step 1 personal info first",
      });
    }

    return reply.send({
      success: true,
      message: "Document uploaded successfully",
      documentUrl,
      data: labourProfile,
    });
  } catch (error) {
    return reply.code(400).send({
      success: false,
      message: error.message,
    });
  }
};

const submitRegistration = async (request, reply) => {
  try {
    const result = await submitRegistrationService(request.user.userId, request.body || {});
    return reply.send({
      success: true,
      message: "Registration submitted successfully. Pending admin approval.",
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
  uploadProfileImage,
  getLabourProfile,
  updateLabourProfile,
  deleteLabourProfile,
  updateLabourStatus,
  updateLabourLocation,
  searchLabours,
  uploadRegistrationDocument,
  submitRegistration,
};





