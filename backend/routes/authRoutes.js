const express = require("express");
const router = express.Router();

const { signup, login,logout } = require("../controllers/authController");
const {
  createStore,
} = require("../controllers/storeController");

router.post("/signup", signup);

router.post("/login", login);
router.get("/logout", logout);

const authMiddleware = require("../middleware/authMiddleware");

// router.post(
//   "/create",
// //   authMiddleware,
//   createStore
// );

module.exports = router;