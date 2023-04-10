const express = require("express");
const UserModel = require("../Models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { email, name, password, phone } = req.body;

  // Check if required fields are present
  if (!email || !name || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Check if email is valid
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address" });
  }

  // Check if password is strong enough
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Please provide a strong password (minimum 8 characters, one lowercase letter, one uppercase letter, and one number)",
    });
  }
  try {
    // Check if user already exists with given email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with given email" });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.json({ message: "Please try again" });
      }
      const user = new UserModel({
        email,
        name,
        password: hash,
        phone,
      });

      await user.save();
      res.json({ message: "signup Successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if required fields are present
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    // Find user with given email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Compare password hashes
    const hash = user.password;
    const userId = user._id;
    const name = user.name;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        let token = jwt.sign({ email, userId }, "shhhhh");
        return res
          .status(200)
          .json({ message: "Login Successfully!", token, name });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = userController;
