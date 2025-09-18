import { Schema } from "mongoose";

const commentScheme = new Schema(
  {
    testo: { type: String, required: true },
    autore: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);

export default commentScheme;
