const LabourProfile = require("../../models/LabourProfile");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Skill = require("../../models/Skill");
const Employer = require("../../models/Employer");
const SubscriptionPlan = require("../../models/SubscriptionPlan");
const EmployerContact = require("../../models/EmployerContact");
const PlatformSetting = require("../../models/PlatformSetting");
const EmployerSubscription = require("../../models/EmployerSubscription");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLoginService = async (body) => {
  const { username, password } = body;

  if (!username || !password) {
    throw new Error(
      "Username and password are required"
    );
  }

  const admin = await Admin.findOne({
    username,
  });

  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  if (admin.status !== "active") {
    throw new Error(
      "Admin account is inactive"
    );
  }

  const token = jwt.sign(
    {
      adminId: admin._id,
      username: admin.username,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    admin,
    token,
  };
};

const getProfileService = async (
  adminId
) => {
  const admin =
    await Admin.findById(adminId)
      .select("-password");

  if (!admin) {
    throw new Error(
      "Admin not found"
    );
  }

  return admin;
};

const getDashboardService = async () => {

  const totalLabours =
    await LabourProfile.countDocuments();

  const totalEmployers =
    await User.countDocuments({
      role: "employer",
    });

  const activeEmployers =
    await User.countDocuments({
      role: "employer",
      status: "active",
    });

  const blockedEmployers =
    await User.countDocuments({
      role: "employer",
      status: "blocked",
    });

  const activeCategories =
    await Category.countDocuments({
      status: "active",
    });

  const inactiveCategories =
    await Category.countDocuments({
      status: "inactive",
    });

  const activeSkills =
    await Skill.countDocuments({
      status: "active",
    });

  const inactiveSkills =
    await Skill.countDocuments({
      status: "inactive",
    });

  const totalActiveUsers =
    await User.countDocuments({
      status: "active",
    });

  const totalSubscriptionPlans =
    await SubscriptionPlan.countDocuments();

  const activeSubscriptionPlans =
    await SubscriptionPlan.countDocuments({
      status: "active",
    });

  const inactiveSubscriptionPlans =
    await SubscriptionPlan.countDocuments({
      status: "inactive",
    });

  const totalLaboursUnlocked =
    await EmployerContact.countDocuments();

  const totalSubscriptionsPurchased =
    await EmployerSubscription.countDocuments();

  return {
    totalLabours,

    totalEmployers,
    activeEmployers,
    blockedEmployers,

    activeCategories,
    inactiveCategories,

    activeSkills,
    inactiveSkills,

    totalActiveUsers,

    totalSubscriptionPlans,
    activeSubscriptionPlans,
    inactiveSubscriptionPlans,

    totalLaboursUnlocked,

    totalSubscriptionsPurchased,
  };
};

// Labour Management

const getAllLaboursService = async () => {
  return await LabourProfile.find()
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
};

const getLabourByIdService = async (
  labourId
) => {
  const labour =
    await LabourProfile.findById(
      labourId
    )
      .populate(
        "categoryId",
        "name"
      )
      .populate(
        "skills",
        "name"
      );

  if (!labour) {
    throw new Error(
      "Labour not found"
    );
  }

  return labour;
};

const blockLabourService = async (
  labourId
) => {
  const labour =
    await LabourProfile.findById(
      labourId
    );

  if (!labour) {
    throw new Error(
      "Labour not found"
    );
  }

  const user =
    await User.findByIdAndUpdate(
      labour.userId,
      {
        status: "blocked",
      },
      {
        new: true,
      }
    );

  return user;
};

const unblockLabourService = async (
  labourId
) => {
  const labour =
    await LabourProfile.findById(
      labourId
    );

  if (!labour) {
    throw new Error(
      "Labour not found"
    );
  }

  const user =
    await User.findByIdAndUpdate(
      labour.userId,
      {
        status: "active",
      },
      {
        new: true,
      }
    );

  return user;
};

const updateLabourStatusService = async (labourId, body) => {
  const { status } = body;

  const labour =
    await LabourProfile.findById(
      labourId
    );

  if (!labour) {
    throw new Error(
      "Labour not found"
    );
  }

  const user =
    await User.findByIdAndUpdate(
      labour.userId,
      {
        status,
      },
      {
        new: true,
      }
    );

  return user;
};

// employer-managemnet
const getAllEmployersService = async () => {
  return await Employer.find()
    .sort({
      createdAt: -1,
    });
};

const getEmployerByIdService = async (employerId) => {
  const employer =
    await Employer.findById(
      employerId
    );

  if (!employer) {
    throw new Error(
      "Employer not found"
    );
  }

  return employer;
};

const blockEmployerService = async (employerId) => {
  const employer =
    await Employer.findById(
      employerId
    );

  if (!employer) {
    throw new Error(
      "Employer not found"
    );
  }

  const user =
    await User.findByIdAndUpdate(
      employer.userId,
      {
        status: "blocked",
      },
      {
        new: true,
      }
    );

  return user;
};

const unblockEmployerService = async (employerId) => {
  const employer =
    await Employer.findById(
      employerId
    );

  if (!employer) {
    throw new Error(
      "Employer not found"
    );
  }

  const user =
    await User.findByIdAndUpdate(
      employer.userId,
      {
        status: "active",
      },
      {
        new: true,
      }
    );

  return user;
};

const updateEmployerStatusService = async (
  employerId,
  body
) => {
  const { status } =
    body;

  const employer =
    await Employer.findById(
      employerId
    );

  if (!employer) {
    throw new Error(
      "Employer not found"
    );
  }

  const user =
    await User.findByIdAndUpdate(
      employer.userId,
      {
        status,
      },
      {
        new: true,
      }
    );

  return user;
};

// subscription plan
const createSubscriptionPlanService = async (body) => {
  const {
    name,
    userType,
    credits,
      durationDays,
    amount,
    description,

  } = body;

  const existingPlan =
    await SubscriptionPlan.findOne({
      name,
      userType,
    });

  if (existingPlan) {
    throw new Error(
      "Subscription plan already exists"
    );
  }

  const plan =
    await SubscriptionPlan.create({
      name,
      userType,
      credits,
        durationDays,
      amount,
      description,
    });

  return plan;
};

const getAllSubscriptionPlansService = async () => {
  return await SubscriptionPlan.find()
    .sort({
      createdAt: -1,
    });
};

const getSubscriptionPlanByIdService = async (planId) => {
  const plan =
    await SubscriptionPlan.findById(
      planId
    );

  if (!plan) {
    throw new Error(
      "Subscription plan not found"
    );
  }

  return plan;
};

const updateSubscriptionPlanService = async (planId, body) => {
  const {
    name,
    userType,
    credits,
      durationDays,
    amount,
    description,
    status,
  } = body;

  const plan =
    await SubscriptionPlan.findById(
      planId
    );

  if (!plan) {
    throw new Error(
      "Subscription plan not found"
    );
  }

  if (name)
    plan.name = name;
  if (userType)
    plan.userType = userType;

  if (credits !== undefined)
    plan.credits = credits;
  if (durationDays !== undefined)
  plan.durationDays = durationDays;

  if (amount !== undefined)
    plan.amount = amount;

  if (
    description !== undefined
  )
    plan.description =
      description;

  if (status)
    plan.status = status;

  await plan.save();

  return plan;
};

const deleteSubscriptionPlanService = async (planId) => {
  const plan =
    await SubscriptionPlan.findById(
      planId
    );

  if (!plan) {
    throw new Error(
      "Subscription plan not found"
    );
  }

  plan.status = "inactive";

  await plan.save();

  return plan;
};

// platform seeting 
const getPlatformSettingsService = async () => {

  let settings =
    await PlatformSetting.findOne();

  if (!settings) {

    settings =
      await PlatformSetting.create({
        defaultEmployerCredits: 10,
      });

  }

  return settings;
};

const updatePlatformSettingsService = async (body) => {
  const {
    defaultEmployerCredits,
  } = body;

  let settings =
    await PlatformSetting.findOne();

  if (!settings) {

    settings =
      await PlatformSetting.create({
        defaultEmployerCredits:
          defaultEmployerCredits ?? 10,
      });

    return settings;
  }

  if (
    defaultEmployerCredits !==
    undefined
  ) {
    settings.defaultEmployerCredits =
      defaultEmployerCredits;
  }

  await settings.save();

  return settings;
};

module.exports = {
  adminLoginService,
  getProfileService,
  getDashboardService,


  getAllLaboursService,
  getLabourByIdService,
  blockLabourService,
  unblockLabourService,
  updateLabourStatusService,

  getAllEmployersService,
  getEmployerByIdService,
  blockEmployerService,
  unblockEmployerService,
  updateEmployerStatusService,

  createSubscriptionPlanService,
  getAllSubscriptionPlansService,
  getSubscriptionPlanByIdService,
  updateSubscriptionPlanService,
  deleteSubscriptionPlanService,

  getPlatformSettingsService,
  updatePlatformSettingsService,
};