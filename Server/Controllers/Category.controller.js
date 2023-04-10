const express = require("express");
const CategoryModel = require("../Models/Category.Model");
const categoryController = express.Router();

// Create a new category
categoryController.post("/createCategory", async (req, res) => {
  const { name, expenses, userId } = req.body;
  const new_category = new CategoryModel({
    name,
    expenses,
    userId,
  });
  try {
    await new_category.save();
    res.status(201).json("Category has been created", new_category);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

// Get all categories
categoryController.get("/getCategories", async (req, res) => {
  const { userId } = req.body;
  const categories = await CategoryModel.find({ userId });
  if (categories) {
    res.status(200).json({ message: "Successfull!", categories });
  } else {
    res.status(404).json({ message: "Something went wrong" });
  }
});

// Update a category by ID
categoryController.patch("/updateCategory/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.body;
  const category = await CategoryModel.findOne({ _id: categoryId });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  if (category.userId === userId) {
    const new_category = await CategoryModel.findOneAndUpdate(
      {
        _id: categoryId,
      },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "Category has been updated successfully!",
      new_category,
    });
  } else {
    return res.status(401).json({ message: "You are not authorized to do it" });
  }
});

// Delete a category by ID
categoryController.delete("/deleteCategory/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.body;
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  if (category.userId === userId) {
    await CategoryModel.findOneAndDelete({ _id: categoryId });
    return res
      .status(201)
      .json({ message: "Category has been deleted successfully!" });
  } else {
    return res.status(401).json({ message: "You are not authorized to do it" });
  }
});

// Add an expense to a category
categoryController.post(
  "/addExpense/:categoryId/expenses",
  async (req, res) => {
    const { categoryId } = req.params;
    const {name,amount} = req.body
    const category = await CategoryModel.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const expense = {
      name,
      amount
    };

    category.expenses.push(expense);

    try {
      const updatedCategory = await category.save();
      res.status(201).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
);



module.exports = categoryController;
