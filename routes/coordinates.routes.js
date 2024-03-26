import express from "express";
import {
  createCoordinatesPin,
  getCoordinatesPin,
  getSingleView,
} from "../controllers/postCoordinates.js";
const router = express.Router();
// router.get("/", postCoordinatesPin);
router.post("/add", createCoordinatesPin);
router.get("/coordinate", getCoordinatesPin);
router.post("/view/:_id", getSingleView);
export default router;
