import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the size sub-schema for size variants
const sizeSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Main Product Schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sizes: [sizeSchema], // Array of size objects
    image: {
      type: String,
      required: true,
    },
    glutenFree: {
      type: Boolean,
      default: false,
    },
    vegan: {
      type: Boolean,
      default: false,
    },
    organic: {
      type: Boolean,
      default: false,
    },
    lactoseFree: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
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

// Create index for searching products faster
productSchema.index({ name: "text", description: "text", category: "text" });

// Middleware to update updatedAt field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model("Product", productSchema);
