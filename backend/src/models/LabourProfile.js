const mongoose = require("mongoose");

const labourProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        // Step 1
        profileImage: {
            type: String,
            default: null,
        },
        mobile: {
            type: String,
            required: true,
            match: [/^[6-9]\d{9}$/, "Mobile number must be 10 digits"],
        },
        fullName: {
            type: String,
            default: null,
        },


        age: {
            type: Number,
            default: null,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: null,
        },

        // Step 2
        homeAddress: {
            type: String,
            default: null,
        },

        homeLatitude: {
            type: Number,
            default: null,
        },

        homeLongitude: {
            type: Number,
            default: null,
        },

        currentLocation: {
            type: String,
            default: null,
        },

        currentLatitude: {
            type: Number,
            default: null,
        },

        currentLongitude: {
            type: Number,
            default: null,
        },

        preferredWorkLocation: {
            type: String,
            default: null,
        },

        preferredWorkLatitude: {
            type: Number,
            default: null,
        },

        preferredWorkLongitude: {
            type: Number,
            default: null,
        },


        // Step 3
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },

        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill",
            },
        ],

        // Step 4
        chargeAmount: {
            type: Number,
            default: null,
        },

        chargeType: {
            type: String,
            enum: ["hour", "day", "week", "month"],
            default: null,
        },

        // Step 5
        availability: {
            monday: {
                type: Boolean,
                default: false,
            },
            tuesday: {
                type: Boolean,
                default: false,
            },
            wednesday: {
                type: Boolean,
                default: false,
            },
            thursday: {
                type: Boolean,
                default: false,
            },
            friday: {
                type: Boolean,
                default: false,
            },
            saturday: {
                type: Boolean,
                default: false,
            },
            sunday: {
                type: Boolean,
                default: false,
            },
        },

        // Step 6
        experience: {
            type: String,
            default: null,
        },

        workType: {
            type: String,
            default: null,
        },

        additionalInfo: {
            type: String,
            default: null,
        },

        isProfileCompleted: {
            type: Boolean,
            default: false,
        },

        isOnline: {
            type: Boolean,
            default: true,
        },

        registrationFeeStatus: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending",
        },

        documentUrl: {
            type: String,
            default: null,
        },

        documentType: {
            type: String,
            default: null,
        },

        adminApprovalStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                default: [0, 0],
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

labourProfileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model(
    "LabourProfile",
    labourProfileSchema
);