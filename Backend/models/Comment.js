import { Schema } from "mongoose";

const commentScheme = new Schema(
  {
    testo: { type: String, required: true },
    data: { type: Date, default: Date.now },
    autore: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);
