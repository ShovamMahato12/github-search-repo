import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    repoId: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    owner: String,
    stars: Number,
    html_url: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", favoriteSchema);