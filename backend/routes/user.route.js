const express = require ("express");
const { signup, verifyEmail, signin, logout, forgotPassword, resetPassword, checkAuth, preferences } = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/reset-Password/:token", resetPassword);
router.post("/forgot-Password", forgotPassword)

router.put("/preference/:id", preferences);

module.exports = router;