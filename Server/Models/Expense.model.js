const mongoose = require("mongoose");
const Schema = mongoose.Schema; // add this line

const ExpenseSchema = new Schema(
  {
    expense_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },
    categoryId: {
      type: String,
    },
  },
  { timestamps: true }
);

const ExpenseModel = mongoose.model("expense", ExpenseSchema);
module.exports = ExpenseModel;
