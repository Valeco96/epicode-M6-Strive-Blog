import mongoose, { Schema } from "mongoose";

const postScheme = new Schema(
  {
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true, minlenght: 20 },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    autore: { type: String, required: true },
    categoria: { type: String, required: true },
    cover: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postScheme);

export default Post;
