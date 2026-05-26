const express = require("express");
const router = express.Router();
const {
  createStore,getAllStores
} = require("../controllers/storeController");
const verifyToken = require("../middleware/authMiddleware");



router.post(
  "/create",
  verifyToken,
  createStore
);

router.get(
  "/allstores",
  getAllStores
);    

module.exports = router;