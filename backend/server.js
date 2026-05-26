const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});