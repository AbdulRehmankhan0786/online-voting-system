const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/candidate", candidateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});