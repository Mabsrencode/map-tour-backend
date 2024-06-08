import mongoose from "mongoose";

const coordinateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image strings
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
const Coordinates = mongoose.model("Coordinates", coordinateSchema);
export default Coordinates;
