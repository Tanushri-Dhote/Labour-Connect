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

      credits: {
        type: Number,
        required: true,
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