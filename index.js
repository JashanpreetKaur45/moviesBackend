// src/app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {
  createMovie,
  getAllMovies,
  updateMovie,
} from "./api/controllers/movieController.js";
import sequelize from "./api/config/database.js";
import { verifyToken } from "./api/middleware/authMiddleware.js";
import loginController from "./api/controllers/login.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("api is working");
});

app.post("/login", loginController);

app.post("/movie", verifyToken, createMovie);
app.get("/movies", verifyToken, getAllMovies);
app.put("/movie/:movieId", verifyToken, updateMovie);

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true, force: false });
    console.log("Database synchronized!");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  syncDatabase();
  console.log(`Server running on port ${PORT}`);
});
