import express from "express";
import {
  createCoordinatesPin,
  getCoordinatesPin,
  getSingleView,
  updateCoordinatesPin,
  deleteCoordinatesPin,
  getAllSearch,
} from "../controllers/postCoordinates.js";
const router = express.Router();
// router.get("/", postCoordinatesPin);
router.post("/add", createCoordinatesPin);
router.get("/coordinate", getCoordinatesPin);
router.post("/view/:_id", getSingleView);
router.patch("/update/:id", updateCoordinatesPin);
router.delete("/delete/:id", deleteCoordinatesPin);
router.get("/search", getAllSearch);
export default router;
