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
