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

const getDashboardService = async () => {
  const totalLabours =
    await User.countDocuments({
      role: "labour",
    });

  const totalEmployers =
    await User.countDocuments({
      role: "customer",
    });

  const totalCategories =
    await Category.countDocuments();

  const totalSkills =
    await Skill.countDocuments();

  const totalActiveUsers =
    await User.countDocuments({
      status: "active",
    });

  return {
    totalLabours,
    totalEmployers,
    totalCategories,
    totalSkills,
    totalActiveUsers,
  };
};



module.exports = {
  adminLoginService,
  getProfileService,
  getDashboardService,
};