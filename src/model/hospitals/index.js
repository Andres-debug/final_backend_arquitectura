import { model, Schema } from "mongoose";

const hospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
export default model("Hospital", hospitalSchema);
