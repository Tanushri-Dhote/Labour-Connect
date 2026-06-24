const LabourProfile = require("../../models/LabourProfile");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Skill = require("../../models/Skill");
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

const getDashboardService = async () =>
   {
  const totalLabours =
    await LabourProfile.countDocuments();

  const totalEmployers =
    await User.countDocuments({
      role: "employer",
    });

  const activeCategories = await Category.countDocuments({
    status: "active",
  });

  const inactiveCategories = await Category.countDocuments({
    status: "inactive",
  });

  const activeSkills = await Skill.countDocuments({
    status: "active",
  });

  const inactiveSkills = await Skill.countDocuments({
    status: "inactive",
  });

  const totalActiveUsers =
    await User.countDocuments({
      status: "active",
    });

  return {
    totalLabours,
    totalEmployers,
    activeCategories,
    inactiveCategories,
    activeSkills,
    inactiveSkills,
    totalActiveUsers,
  };
};

// Labour Management

const getAllLaboursService =async () => {
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


module.exports = {
  adminLoginService,
  getProfileService,
  getDashboardService,
  getAllLaboursService,
  getLabourByIdService,
  blockLabourService,
  unblockLabourService,
  updateLabourStatusService,
};