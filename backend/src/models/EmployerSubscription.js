const mongoose = require("mongoose");

const employerSubscriptionSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },

    planName: {
      type: String,
      required: true,
    },

    credits: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "success",
        "failed",
      ],
      default: "success",
    },

    transactionId: {
      type: String,
      default: null,
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EmployerSubscription",
  employerSubscriptionSchema
);