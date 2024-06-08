import Coordinates from "../models/coordinates.js";
import mongoose from "mongoose";

export const getCoordinatesPin = async (req, res) => {
  try {
    const coordinates = await Coordinates.find({});
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error getting location:", error);
    res.status(404).json({ message: error.message });
  }
};

export const getSingleView = async (req, res) => {
  try {
    const viewId = req.params._id;
    console.log(viewId);
    const data = await Coordinates.findById(viewId);
    res.status(200).send(data);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const createCoordinatesPin = async (req, res) => {
  try {
    const { title, description, images, location } = req.body;
    if (!title || !description || !images || images.length === 0 || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newPost = new Coordinates({
      title,
      description,
      images, // Store the array of images
      location,
    });
    await newPost.save();
    return res.status(200).json({ message: "Location added successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ error: validationErrors });
    } else {
      console.error("Error creating location:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// export const updateCoordinatesPin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, images, location } = req.body;
//     const updatedPin = await Coordinates.findByIdAndUpdate(
//       id,
//       { title, description, images, location },
//       { new: true }
//     );
//     res.status(200).json(updatedPin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteCoordinatesPin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Coordinates.findByIdAndDelete(id);
//     res.status(200).json({ message: "Location deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
