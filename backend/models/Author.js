import mongoose, { Schema } from "mongoose";

const AuthorScheme = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataDiNascita: { type: String, required: true },
  avatar: {       // se avviene salvataggio immagine su Cloudinary, entrambe avatar e avatarPublicId salvano rispettivamente su result.secure_url e result.public_id
    type: String, // al primo salvataggio senza l'upload, salviamo l'avatar di default. 
    default: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
  },
  avatarPublicId: {
    type: String,
    default: null, // quando l'autore aggiorna o elimina l'avatar: cloudinary.uploader.destroy(autore.avatarPublicId)
  },
});

const Author = mongoose.model("Author", AuthorScheme);

export default Author;
