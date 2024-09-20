import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Category Schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // URL of the category image
      required: false,
    },
    isFeatured: {
      type: Boolean,
      default: false, // Indicates whether the category is featured
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware to update updatedAt field before saving
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to handle updates
categorySchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model("Category", categorySchema);
