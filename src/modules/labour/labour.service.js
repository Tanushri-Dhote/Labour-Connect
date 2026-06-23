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

  labourProfile.isProfileCompleted =
    true;

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

};