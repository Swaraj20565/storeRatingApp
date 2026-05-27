const express = require("express");
const router = express.Router();

const { signup, login,logout } = require("../controllers/authController");
const {
  createStore
} = require("../controllers/storeController");

const {
  ProfileStore
} = require("../controllers/authController");


router.post("/signup", signup);

router.post("/login", login);
router.get("/logout", logout);

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/profile",
  authMiddleware,
  ProfileStore
);

module.exports = router;