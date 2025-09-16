import mongoose from "mongoose";
import Author from "../models/Author.js";

export async function getAll(request, response) {
  try {
    const authors = await Author.find();
    response.status(200).json(authors);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero degli autori", error });
  }
}

export async function create(request, response) {
  try {
    const { nome, cognome, email, dataDiNascita, avatar } = request.body;
    if (!nome || !cognome || !email || !dataDiNascita) {
      return response
        .status(400)
        .json({ message: "I campi non compilati sono obbligatori" });
    }
    const newAuthor = Author({ nome, cognome, email, dataDiNascita, avatar });
    const authorSaved = await newAuthor.save();
    response.status(201).json(authorSaved);
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(400)
        .json({ message: "Email gia' presente nel database" });
    }
    response
      .status(500)
      .json({ message: "Errore nella creazione dell'autore", error });
  }
}

export async function get(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    const author = await Author.findById(id);
    if (!author) {
      return response.status(404).json({ message: "Autore non trovato" });
    }
    response.status(200).json(author);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero dei dati dell'autore", error });
  }
}

export async function put(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    const { nome, cognome, email, dataDiNascita, avatar } = request.body;
    if (!nome || !cognome || !email || !dataDiNascita) {
      return response
        .status(400)
        .json({ message: "I campi non compilati sono obbligatori" });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        nome,
        cognome,
        email,
        dataDiNascita,
        avatar,
      },
      { new: true }
    );
    if (!updatedAuthor) {
      return response.status(400).json({ message: "Autore non trovato" });
    }
    response.status(200).json(updatedAuthor);
  } catch (error) {
    response.status(500).json({
      message: "Errore nell'aggiornamento dei dati dell'autore",
      error,
    });
  }
}

export async function remove(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return response.status(404).json({ message: "Autore non trovato" });
    }
    response.status(200).json(deletedAuthor);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nell'eliminazione dell'autore", error });
  }
}

export async function addAvatar(request, response) {
  try {
    console.log("Files body:", request.body);
    console.log("File ricevuto:", request.file);

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }

    //Estraggo i dati da Cloudinary restituiti da multer-storage-cloudinary
    const avatarPath = request.file.path; //secure_url
    const avatarPublicId = request.file.filename; //public_id

    const autore = await Author.findById(id);
    if (!autore) {
      return response.status(404).json({ message: "Utente non trovato." });
    }

    //se aveva un avatar precedente lo elimino da cloudinary
    if (autore.avatarPublicId) {
      await cloudinary.uploader.destroy(autore.avatarPublicId);
    }

    //aggiorno i campi nel database
    autore.avatar = avatarPath;
    autore.avatarPublicId = avatarPublicId;
    await autore.save();

    response.status(200).json(autore);
  } catch (error) {
    response.status(500).json({
      message: "Errore nel caricamento dell'immagine dell'autore",
      error,
    });
  }
}

export async function removeAvatar(request, response) {
  try {
    //trova l'autore nel database
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }

    const autore = await Author.findById(id);
    if (!autore) {
      return response.status(404).json({ message: "Utente non trovato." });
    }

    //se ha un publicId (immagine giá esistente su cloudinary) la elimina
    if (autore.avatarPublicId) {
      await cloudinary.uploader.destroy(autore.avatarPublicId);
    }

    //Reset ai valori di default
    autore.avatar =
      "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg";
    autore.avatarPublicId = null;

    await autore.save();

    response
      .status(200)
      .json({ message: "L'eliminazione dell'avatar é avvenuta con successo!" });
  } catch (error) {
    response
      .status(500)
      .json({
        message:
          "Qualcosa é andato storto nell'eliminazione dell'avatar, riprovare",
        error,
      });
  }
}
