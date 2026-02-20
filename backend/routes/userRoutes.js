const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const User = require("../models/users");

const router = express.Router();

/* ============================
   SIGNUP ROUTE
============================ */
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      mobile,
      address,
      aadharCardNumber,
      password
    } = req.body;

    // Basic validation
    if (!name || !age || !address || !aadharCardNumber || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ aadharCardNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      age,
      email,
      mobile,
      address,
      aadharCardNumber,
      password: hashedPassword,
      role: "voter",     // force voter role
      hasVoted: false
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


/* ============================
   LOGIN ROUTE
============================ */
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Find user
    const user = await User.findOne({ aadharCardNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        hasVoted: user.hasVoted
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


/* ============================
   UPDATE PROFILE (AUTH)
============================ */
router.put("/update", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, mobile, address, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile, address, age },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});




/* ============================
   GET LOGGED IN USER PROFILE
============================ */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    res.json(user);

  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
