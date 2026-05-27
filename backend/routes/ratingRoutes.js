const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createRating,getRating,getRatingAll
} = require("../controllers/ratingController");

router.post("/add_rating",verifyToken, createRating);
router.get("/get_rating",verifyToken, getRating);
router.get("/get_rating_all",verifyToken, getRatingAll);

module.exports = router;