import mongoose, { Schema } from "mongoose";

const AuthorScheme = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataDiNascita: { type: String, required: true },
  avatar: { type: String },
});

const Author = mongoose.model("Author", AuthorScheme);

export default Author;
