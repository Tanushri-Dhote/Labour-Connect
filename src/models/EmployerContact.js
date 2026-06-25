const mongoose =
  require("mongoose");

const employerContactSchema =
  new mongoose.Schema(
    {
      employerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Employer",
        required: true,
      },

      labourId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "LabourProfile",
        required: true,
      },

      contactType: {
        type: String,
        enum: [
          "call",
          "message",
        ],
        required: true,
      },

      contactedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "EmployerContact",
    employerContactSchema
  );