const express = require("express");
const CategoryModel = require("../Models/Category.Model");
const ExpenseModel = require("../Models/Expense.model");
const categoryController = express.Router();

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Create a new category
categoryController.post("/create", async (req, res) => {
  const catColor = getRandomColor();
  const { category_name, userId } = req.body;
  const new_category = new CategoryModel({
    category_name,
    userId,
    catColor,
  });
  await new_category.save();
  return res.status(201).json({ message: "Category has been created", data:new_category});
});

// Get all categories
categoryController.get("/", async (req, res) => {
  const { userId } = req.body;
  const categories = await CategoryModel.find({ userId });
  return res.status(200).json({data:categories});
});

// Get a category by ID
categoryController.get("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({data:category});
});

// Update a category by ID
categoryController.patch("/edit/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.body;
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (category.userId === userId) {
    const new_category = await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      { new: true }
    );
    await ExpenseModel.updateMany(
      { categoryId: categoryId },
      { category: new_category.category_name }
    ); 
    return res.status(200).json({
      message: "Category has been updated successfully!",
      data:new_category,
    });
  } else {
    return res.json({ message: "You are not authorized to do it!" });
  }
});

// Delete a category by ID
categoryController.delete("/delete/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.body;
  const category = await CategoryModel.findOne({ _id: categoryId });

  if (category.userId === userId) {
    await CategoryModel.findOneAndDelete({ _id: categoryId });
    await ExpenseModel.deleteMany({ categoryId: categoryId });
    return res
      .status(202)
      .json({ message: "Category has been deleted successfully!" });
  } else {
    return res.json({ message: "you are not authorised to do it" });
  }
});
module.exports = categoryController;
