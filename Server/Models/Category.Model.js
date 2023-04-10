const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expenses: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
