const mongoose = require("mongoose");

const platformSettingSchema = new mongoose.Schema(
  {
    defaultEmployerCredits: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PlatformSetting",
  platformSettingSchema
);