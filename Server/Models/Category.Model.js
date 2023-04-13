const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    catColor: {
      type: String,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
