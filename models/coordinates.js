import mongoose from "mongoose";

const coordinateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    location: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);
const Coordinates = mongoose.model("Coordinates", coordinateSchema);
export default Coordinates;
