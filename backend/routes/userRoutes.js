/**
 * File: routes/userRoutes.js
 */

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserByUsername,
  updateUserProfile,
  updateUserProfileImage,
  deleteAccount,
  getAllUsers, 
} = require("../controllers/userController");

const router = express.Router();


// POST http://localhost:5000/api/users/register
router.post("/register", registerUser);       

// POST http://localhost:5000/api/users/login
router.post("/login", loginUser);             

// GET http://localhost:5000/api/users/getUser/:username
router.get("/getUser/:username", getUserByUsername);

// PATCH http://localhost:5000/api/users/updateProfile/:username
router.patch("/updateProfile/:username", updateUserProfile);

// PATCH http://localhost:5000/api/users/updateProfileImage/:username
router.patch("/updateProfileImage/:username", updateUserProfileImage);

// DELETE http://localhost:5000/api/users/deleteAccount/:username
router.delete("/deleteAccount/:username", deleteAccount);

// GET http://localhost:5000/api/users/allUsers
router.get("/allUsers", getAllUsers); 

module.exports = router;
