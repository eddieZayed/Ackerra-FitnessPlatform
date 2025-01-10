const express = require("express");
const {
  registerUser,
  loginUser,
  getUserByUsername,
  updateUserProfile,       
  updateUserProfileImage,  
  deleteAccount,           
} = require("../controllers/userController");

const router = express.Router();

// EXISTING
router.post("/register", registerUser);       // POST http://localhost:5000/api/users/register
router.post("/login", loginUser);             // POST http://localhost:5000/api/users/login
router.get("/getUser/:username", getUserByUsername); // GET http://localhost:5000/api/users/getUser/username
router.patch("/updateProfile/:username", updateUserProfile);       // PATCH http://localhost:5000/api/users/updateProfile/username
router.patch("/updateProfileImage/:username", updateUserProfileImage); // PATCH http://localhost:5000/api/users/updateProfileImage/username
router.delete("/deleteAccount/:username", deleteAccount);          // DELETE http://localhost:5000/api/users/deleteAccount/username

module.exports = router;
