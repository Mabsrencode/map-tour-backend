import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import coordinates from "./routes/coordinates.routes.js";
import authRoutes from "./routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const dbUrl = process.env.DB;
const PORT = process.env.PORT || 4000;

const connection = mongoose.connection;

try {
  mongoose.connect(dbUrl);
} catch (error) {
  console.log(error.message);
}

connection.once("open", () => {
  console.log("MongoDB connection successful");
});

connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});

app.use("/map", coordinates);
app.use("/auth", authRoutes);
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
