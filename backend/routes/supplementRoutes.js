const express = require("express");
const { getAllSupplements } = require("../controllers/supplementController");
const router = express.Router();

// Route to get all supplements
router.get("/", getAllSupplements);

module.exports = router;
