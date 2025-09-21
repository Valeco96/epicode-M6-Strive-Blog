import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const AuthorScheme = new Schema(
  {
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    dataDiNascita: { type: Date, required: true },
    avatar: {
      // se avviene salvataggio immagine su Cloudinary, entrambe avatar e avatarPublicId salvano rispettivamente su result.secure_url e result.public_id
      type: String, // al primo salvataggio senza l'upload, salviamo l'avatar di default.
      default:
        "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
    },
    avatarPublicId: {
      type: String,
      default: null, // quando l'autore aggiorna o elimina l'avatar: cloudinary.uploader.destroy(autore.avatarPublicId)
    },
    googleId: String,
    facebookId: String,
  },
  { timestamps: true }
);

//struttura che si attiva ogni volta che sta per salvare. Quindi prima di fare .save() nel db, attiva questa funzione. Middleware che si interprone tra controller e db
AuthorScheme.pre("save", async function (next) {
  //prima controlliamo se questo campo é cambiato:
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

AuthorScheme.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Author = mongoose.model("Author", AuthorScheme);

export default Author;
