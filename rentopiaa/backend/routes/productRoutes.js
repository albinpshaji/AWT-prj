const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product
router.post("/", upload.single("image"), async (req, res) => {
  const { name, category, price, deposit, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const product = new Product({ name, category, price, deposit, description, image });
  await product.save();
  res.json(product);
});

module.exports = router;
