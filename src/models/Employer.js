const mongoose = require("mongoose");

const employerSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      companyName: {
        type: String,
        required: true,
        trim: true,
      },

      contactPerson: {
        type: String,
        required: true,
        trim: true,
      },

      mobile: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: null,
      },

      companyType: {
        type: String,
        default: null,
      },

      gstNumber: {
        type: String,
        default: null,
      },

      address: {
        type: String,
        default: null,
      },

      city: {
        type: String,
        default: null,
      },

      state: {
        type: String,
        default: null,
      },

      profileImage: {
        type: String,
        default: null,
      },

      isProfileCompleted: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
          "blocked",
        ],
        default: "active",
      },
      contactCredits: {
        type: Number,
        default: 10,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Employer",
    employerSchema
  );