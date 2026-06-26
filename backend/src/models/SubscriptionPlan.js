const mongoose =
  require("mongoose");

const subscriptionPlanSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      userType: {
        type: String,
        enum: ["employer", "labour"],
        required: true,
      },

      credits: {
        type: Number,
        required: function () {
          return this.userType === "employer";
        },
        default: null,
      },

      durationDays: {
        type: Number,
        required: function () {
          return this.userType === "labour";
        },
        default: null,
      },

      amount: {
        type: Number,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "SubscriptionPlan",
    subscriptionPlanSchema
  );