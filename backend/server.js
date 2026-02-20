const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
