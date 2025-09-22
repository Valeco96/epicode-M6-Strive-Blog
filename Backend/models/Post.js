import mongoose, { Schema } from "mongoose";
import commentScheme from "./Comment.js";

const postScheme = new Schema(
  {
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true, minlenght: 20 },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    autore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    categoria: { type: String, required: true },
    cover: {
      //URL dell'immagine
      type: String,
      default:
        "https://images.pexels.com/photos/4842562/pexels-photo-4842562.jpeg",
    },
    coverPublicId: {
      //Id di Cloudinary per eventuale eliminazione
      type: String,
      default: null,
    },
    comments: [commentScheme],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postScheme);

export default Post;
