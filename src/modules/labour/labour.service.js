const fs = require("fs");
const path = require("path");

const User = require("../../models/User");
const LabourProfile = require("../../models/LabourProfile");
const Category = require("../../models/Category");
const Skill = require("../../models/Skill");

const savePersonalInfoService = async (

  userId,
  data
) => {
  const { fullName, age, gender } = data;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "labour") {
    throw new Error(
      "Only labour can access this API"
    );
  }
  let labourProfile =
    await LabourProfile.findOne({
      userId,
    });

 if (!labourProfile) {
  labourProfile =
    await LabourProfile.create({
      userId,
      mobile: user.mobile,
    });
}
  // Update Step 1 Data
  labourProfile.mobile = user.mobile;
  labourProfile.fullName = fullName;
  labourProfile.age = age;
  labourProfile.gender = gender;

  await labourProfile.save();
  return labourProfile;
};

const saveAddressInfoService = async (
  userId,
  data
) => {
  const labourProfile =
    await LabourProfile.findOne({
      userId,
    });

  if (!labourProfile) {
    throw new Error(
      "Please complete Step 1 first"
    );
  }

  labourProfile.homeAddress =
    data.homeAddress;

  labourProfile.homeLatitude =
    data.homeLatitude;

  labourProfile.homeLongitude =
    data.homeLongitude;

  labourProfile.currentLocation =
    data.currentLocation;

  labourProfile.currentLatitude =
    data.currentLatitude;

  labourProfile.currentLongitude =
    data.currentLongitude;

  if (data.currentLongitude !== undefined && data.currentLatitude !== undefined) {
    labourProfile.location = {
      type: "Point",
      coordinates: [Number(data.currentLongitude), Number(data.currentLatitude)],
    };
  }

 labourProfile.preferredWorkLocation =
  data.preferredWorkLocation;
labourProfile.preferredWorkLatitude =
  data.preferredWorkLatitude;
labourProfile.preferredWorkLongitude =
  data.preferredWorkLongitude;

  await labourProfile.save();

  return labourProfile;
};


const saveWorkInfoService = async (
  userId,
  data
) => {
  const {
    categoryId,
    skills,
  } = data;

  const labourProfile =
    await LabourProfile.findOne({
      userId,
    });

  if (!labourProfile) {
    throw new Error(
      "Please complete Step 1 first"
    );
  }

  const category =
    await Category.findById(categoryId);

  if (!category) {
    throw new Error(
      "Invalid category selected"
    );
  }

  const skillCount =
    await Skill.countDocuments({
      _id: { $in: skills },
    });

  if (
    skillCount !== skills.length
  ) {
    throw new Error(
      "Invalid skills selected"
    );
  }

  labourProfile.categoryId =
    categoryId;

  labourProfile.skills =
    skills;

  await labourProfile.save();

  return labourProfile;
};

const saveChargeInfoService = async (
  userId,
  data
) => {
  const {
    chargeAmount,
    chargeType,
  } = data;

  const labourProfile =
    await LabourProfile.findOne({
      userId,
    });

  if (!labourProfile) {
    throw new Error(
      "Please complete previous steps first"
    );
  }

  const validTypes = [
    "hour",
    "day",
    "week",
    "month",
  ];

  if (
    !validTypes.includes(chargeType)
  ) {
    throw new Error(
      "Invalid charge type"
    );
  }

  labourProfile.chargeAmount =
    chargeAmount;

  labourProfile.chargeType =
    chargeType;

  await labourProfile.save();

  return labourProfile;
};

const saveAvailabilityInfoService = async (
  userId,
  data
) => {
  const labourProfile =
    await LabourProfile.findOne({ userId });

  if (!labourProfile) {
    throw new Error("Labour profile not found");
  }

  labourProfile.availability = {
    monday: data.availability?.monday || false,
    tuesday: data.availability?.tuesday || false,
    wednesday: data.availability?.wednesday || false,
    thursday: data.availability?.thursday || false,
    friday: data.availability?.friday || false,
    saturday: data.availability?.saturday || false,
    sunday: data.availability?.sunday || false,
  };

  await labourProfile.save();

  return labourProfile;
};

const saveExperienceInfoService = async (
  userId,
  data
) => {
  const {
    experience,
    workType,
    additionalInfo,
  } = data;

  const labourProfile =
    await LabourProfile.findOne({
      userId,
    });

  if (!labourProfile) {
    throw new Error(
      "Labour profile not found"
    );
  }

  labourProfile.experience =
    experience;

  labourProfile.workType =
    workType;

  labourProfile.additionalInfo =
    additionalInfo;

  await labourProfile.save();

  return labourProfile;
};


const getLabourProfileService = async (userId) => {
  const labourProfile = await LabourProfile.findOne({ userId })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "skills", select: "name" });

  if (!labourProfile) {
    throw new Error("Labour profile not found");
  }

  return labourProfile;
};


const updateLabourProfileService = async (
  userId,
  body
) => {
  const profile =
    await LabourProfile.findOneAndUpdate(
      { userId },
      body,
      { new: true }
    );

  if (!profile) {
    throw new Error(
      "Labour profile not found"
    );
  }

  return profile;
};

const deleteLabourProfileService = async (userId) => {
  const labourProfile = await LabourProfile.findOne({ userId });

  if (!labourProfile) {
    throw new Error("Labour profile not found");
  }

  // Delete profile image file if present
  if (labourProfile.profileImage) {
    // Stored as `/uploads/profile-images/<filename>` in controller
    const parts = labourProfile.profileImage.split("/");
    const fileName = parts[parts.length - 1];

    if (fileName) {
      const filePath = path.join(
        process.cwd(),
        "uploads/profile-images",
        fileName
      );

      fs.promises
        .unlink(filePath)
        .catch(() => {
          // Ignore if file doesn't exist
        });

    }
  }

  // Delete document
  const deleted = await LabourProfile.findOneAndDelete({
    userId,
  });

  return deleted;
};

const updateLabourStatusService = async (userId, isOnline) => {
  const profile = await LabourProfile.findOne({ userId });
  if (!profile) {
    throw new Error("Labour profile not found");
  }
  profile.isOnline = isOnline;
  await profile.save();
  return profile;
};

const updateLabourLocationService = async (userId, data) => {
  const profile = await LabourProfile.findOne({ userId });
  if (!profile) {
    throw new Error("Labour profile not found");
  }
  
  if (data.currentLocation) profile.currentLocation = data.currentLocation;
  if (data.latitude !== undefined) profile.currentLatitude = Number(data.latitude);
  if (data.longitude !== undefined) profile.currentLongitude = Number(data.longitude);

  if (data.longitude !== undefined && data.latitude !== undefined) {
    profile.location = {
      type: "Point",
      coordinates: [Number(data.longitude), Number(data.latitude)]
    };
  }

  await profile.save();
  return profile;
};

const searchLaboursService = async (query) => {
  const { categoryId, skills, latitude, longitude, radius = 10 } = query;
  
  const filter = {
    isProfileCompleted: true,
    isOnline: true,
    adminApprovalStatus: "approved"
  };

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  if (skills) {
    const skillList = Array.isArray(skills) ? skills : skills.split(',');
    filter.skills = { $in: skillList };
  }

  if (latitude && longitude) {
    filter.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)]
        },
        $maxDistance: Number(radius) * 1000 // distance in meters
      }
    };
  }

  return await LabourProfile.find(filter)
    .populate({ path: "userId", select: "mobile" })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "skills", select: "name" });
};

const submitRegistrationService = async (userId, data) => {
  const { documentType } = data;
  const labourProfile = await LabourProfile.findOne({ userId });
  
  if (!labourProfile) {
    throw new Error("Labour profile not found");
  }

  if (!labourProfile.documentUrl) {
    throw new Error("Please upload registration document first");
  }

  if (documentType) {
    labourProfile.documentType = documentType;
  }

  labourProfile.registrationFeeStatus = "paid"; // Mocked payment
  labourProfile.adminApprovalStatus = "pending";
  labourProfile.isProfileCompleted = true; // User onboarding steps done

  await labourProfile.save();
  return labourProfile;
};

module.exports = {
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
};

