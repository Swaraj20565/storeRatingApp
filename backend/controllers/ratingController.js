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
      console.log("Received request to get rating with query:", req.query);
  try {

    const { storeId } = req.query;

    const userId = req.user.id;

    console.log("Received rating data:", {
      storeId,
      userId
    });

     const ratings = await prisma.rating.findMany({
       where: {
       storeId: Number(storeId),
      },
     });

     const store = await prisma.store.findUnique({
  where: {
    id: Number(storeId),
  },
});

     console.log("Ratings for Store ID",store);

console.log(ratings.length);
const sum = ratings.reduce((total, item) => total + item.rating, 0);

const average =
  ratings.length > 0 ? sum / ratings.length : 0;

console.log("Sum:", sum);
console.log("Average:", average);

    return res.status(200).json({
      success: true,
      AverageRating: average.toFixed(1),
      length: ratings.length,
      store: store,
      ratings: ratings,
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