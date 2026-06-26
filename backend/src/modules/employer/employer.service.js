const Employer = require("../../models/Employer");
const User = require("../../models/User");
const LabourProfile = require("../../models/LabourProfile");
const EmployerContact = require("../../models/EmployerContact");
const PlatformSetting = require("../../models/PlatformSetting");

const saveCompanyInfoService = async (userId, body) => {
  const {
    companyName,
    contactPerson,
    email,
  } = body;

  const user =
    await User.findById(
      userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  let employer =
    await Employer.findOne({
      userId,
    });

  if (employer) {
    employer.companyName =
      companyName;

    employer.contactPerson =
      contactPerson;

    employer.email =
      email;

    await employer.save();

    return employer;
  }

  const settings =
    await PlatformSetting.findOne();

  const defaultEmployerCredits =
    settings?.defaultEmployerCredits || 10;

  employer =
    await Employer.create({
      userId,
      mobile:
        user.mobile ||
        user.mobileNumber,
      companyName,
      contactPerson,
      email,
      contactCredits:
        defaultEmployerCredits,
    });
  return employer;
};

const saveBusinessInfoService = async (userId, body) => {
  const {
    companyType,
    gstNumber,
    address,
    city,
    state,
  } = body;

  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer profile not found. Complete company information first."
    );
  }

  employer.companyType =
    companyType;

  employer.gstNumber =
    gstNumber;

  employer.address =
    address;

  employer.city = city;

  employer.state =
    state;

  await employer.save();

  return employer;
};

const uploadProfileImageService = async (userId, imageUrl) => {
  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer profile not found"
    );
  }

  employer.profileImage =
    imageUrl;

  employer.isProfileCompleted =
    true;

  await employer.save();

  return employer;
};

const getEmployerProfileService = async (userId) => {
  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer profile not found"
    );
  }

  return employer;
};

const updateEmployerProfileService = async (userId, body) => {
  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer profile not found"
    );
  }

  Object.assign(
    employer,
    body
  );

  await employer.save();

  return employer;
};

const deleteEmployerProfileService = async (userId) => {
  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer profile not found"
    );
  }

  employer.status =
    "inactive";

  await employer.save();

  return employer;
};

// labour list with filter
const getLaboursService = async (queryParams) => {
  const {
    search,
    categoryId,
    skillId,
    chargeType,
    experience,
    workType,
    location,
    isOnline,
  } = queryParams;

  const query = {};

  // Search by Labour Name
  if (search) {
    query.fullName = {
      $regex: search,
      $options: "i",
    };
  }

  // Category
  if (categoryId) {
    query.categoryId = categoryId;
  }

  // Skill
  if (skillId) {
    query.skills = skillId;
  }

  // Charge Type
  if (chargeType) {
    query.chargeType = chargeType;
  }

  // Experience
  if (experience) {
    query.experience = experience;
  }

  // Work Type
  if (workType) {
    query.workType = workType;
  }

  // Location
  if (location) {
    query.preferredWorkLocation = {
      $regex: location,
      $options: "i",
    };
  }

  // Online Status
  if (isOnline !== undefined) {
    query.isOnline =
      isOnline === "true";
  }

  const labours =
    await LabourProfile.find(query)
      .populate(
        "categoryId",
        "name"
      )
      .populate(
        "skills",
        "name"
      )
      .sort({
        createdAt: -1,
      });

  return labours;
};

// contact credites

const contactLabourService = async (
  userId,
  body
) => {
  const { labourId, contactType } =
    body;

  if (
    !["call", "message"].includes(
      contactType
    )
  ) {
    throw new Error(
      "Invalid contact type"
    );
  }

  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer not found"
    );
  }

  const labour =
    await LabourProfile.findById(
      labourId
    );

  if (!labour) {
    throw new Error(
      "Labour not found"
    );
  }

  const alreadyContacted =
    await EmployerContact.findOne({
      employerId:
        employer._id,
      labourId,
    });

  if (alreadyContacted) {
    return {
      alreadyContacted: true,
      remainingCredits:
        employer.contactCredits,
      labour,
    };
  }

  if (
    employer.contactCredits <= 0
  ) {
    throw new Error(
      "No contact credits remaining. Please purchase a subscription plan."
    );
  }

  await EmployerContact.create({
    employerId:
      employer._id,
    labourId,
    contactType,
  });

  employer.contactCredits -= 1;

  await employer.save();

  return {
    alreadyContacted: false,
    remainingCredits:
      employer.contactCredits,
    labour,
  };
};

// contact history
const getContactHistoryService = async (userId) => {
  const employer =
    await Employer.findOne({
      userId,
    });

  if (!employer) {
    throw new Error(
      "Employer not found"
    );
  }

  const contacts =
    await EmployerContact.find({
      employerId:
        employer._id,
    })
      .populate({
        path: "labourId",
        populate: [
          {
            path: "categoryId",
            select: "name",
          },
          {
            path: "skills",
            select: "name",
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

  return contacts;
};



module.exports = {
  saveCompanyInfoService,
  saveBusinessInfoService,
  uploadProfileImageService,
  getEmployerProfileService,
  updateEmployerProfileService,
  deleteEmployerProfileService,

  getLaboursService,

  contactLabourService,

  getContactHistoryService,
};