const express = require("express");
const ExpenseModel = require("../Models/Expense.model");
const CategoryModel = require("../Models/Category.Model");
const expenseController = express.Router();

// Create a new expense
expenseController.post("/create", async (req, res) => {
  const { expense_name,amount, category } = req.body;
  const mainCategory = await CategoryModel.findOne({ category_name: category });
  console.log(mainCategory)
  const categoryId = mainCategory._id;
  // const userId = mainCategory.userId;
  const new_expense = new ExpenseModel({
    expense_name,
    amount,
    category,
    categoryId,
  });
  await new_expense.save();
  return res
    .status(201)
    .json({ message: "Expense has been created", data: new_expense });
});

// Get all expenses
expenseController.get("/", async (req, res) => {
  const { userId } = req.params;
  console.log(req.body);
  const expenses = await ExpenseModel.find({ userId });
  return res.json({ message: "successfull!", data: expenses });
});

// Get an expense by ID
expenseController.get("/:expenseId", async (req, res) => {
  const { expenseId } = req.params;
  const expenses = await ExpenseModel.findOne({ _id: expenseId });
  if (expenses) {
    return res.json({ data: expenses });
  }
});

// Calculate total expenses
expenseController.get("/total", async (req, res) => {
  // const { userId } = req.params;
  const expenses = await ExpenseModel.find();
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  return res.json({ message: "successfull!", data: total });
});


// Update an expense by ID
expenseController.patch("/edit/:expenseId", async (req, res) => {
  const { expenseId } = req.params;
  const new_expense = await ExpenseModel.updateOne(
    { _id: expenseId },
    req.body
  );
  return res.json({
    message: "Category has been updated successfully!",
    data: new_expense,
  });
});

// Delete an expense by ID
expenseController.delete("/delete/:expenseId", async (req, res) => {
  const { expenseId } = req.params;

  await ExpenseModel.deleteOne({ _id: expenseId });
  return res.json({ message: "Expense has been deleted successfully!" });
});

module.exports = expenseController;
