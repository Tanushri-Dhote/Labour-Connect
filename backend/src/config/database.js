const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Seed default admin if none exists
    const Admin = require("../models/Admin");
    const bcrypt = require("bcryptjs");
    
    // Log existing admins in the database
    const existingAdmins = await Admin.find({});
    console.log("Existing admins in database:", existingAdmins.map(a => a.username));

    const adminExists = await Admin.findOne({ username: "admin" });
    const hashedPassword = await bcrypt.hash("admin123", 10);
    if (!adminExists) {
      await Admin.create({
        username: "admin",
        password: hashedPassword,
        name: "System Admin",
        status: "active"
      });
      console.log("Default admin seeded: username: 'admin', password: 'admin123'");
    } else {
      adminExists.password = hashedPassword;
      await adminExists.save();
      console.log("Default admin exists; password has been updated/reset to 'admin123'");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;