// storeController.js

const prisma = require("../lib/prisma");

const createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    console.log("Received store creation data:", {
      name,
      email,
      address
    });

    const ownerId = req.user.id;
//     const ownerId = 10;

    console.log("Authenticated User ID:", ownerId);

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId, // ✅ use authenticated user id
      },
    });

    return res.status(201).json({
      success: true,
      message: "Store Created Successfully",
      store,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      data: stores,
    });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports = {
  createStore,
  getAllStores,
};