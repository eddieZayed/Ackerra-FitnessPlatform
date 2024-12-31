const express = require("express");
const { registerUser, loginUser, getUserByUsername } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser); // POST http://localhost:5000/api/users/register
router.post("/login", loginUser); //POST http://localhost:5000/api/users/login
router.get("/getUser/:username", getUserByUsername); // GET http://localhost:5000/api/users/getUser/username

module.exports = router;
