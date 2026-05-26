// controllers/ratingController.js

const prisma = require("../lib/prisma");

const createRating = async (req, res) => {

  try {

    const {
      storeId,
      rating,
      review
    } = req.body;

    const userId = req.user.id;

    console.log("Received rating data:", {
      storeId,
      rating,
      review,
      userId
    });
    

    const newRating = await prisma.rating.create({
      data: {
        rating: Number(rating),
        review,
        userId,
        storeId: Number(storeId),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Rating added successfully",
      rating: newRating,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};
const getRating = async (req, res) => {

  try {

    const {
      storeId
    } = req.body;

    const userId = req.user.id;

    console.log("Received rating data:", {
      storeId,
      userId
    });

    return res.status(201).json({
      success: true,
      message: "Rating added successfully",
      rating: newRating,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};
module.exports = {
  createRating,getRating
};