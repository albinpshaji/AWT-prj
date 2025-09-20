const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if(admin) res.json({ message: "Admin login success" });
  else res.status(400).json({ message: "Invalid credentials" });
});

module.exports = router;
