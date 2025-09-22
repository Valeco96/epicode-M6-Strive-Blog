import mongoose from "mongoose";
import Post from "../models/Post.js";

export async function getAllPosts(request, response) {
  try {
    const search = request.query;

    let filter = {};
    if (search) {
      filter = { titolo: { $regex: search, $option: "i" } };
    }

    const posts = await Post.find().populate("autore");
    response.status(200).json(posts);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero dei post", error });
  }
}

export async function createPost(request, response) {
  try {
    const { titolo, descrizione, readTime, categoria, cover } = request.body;

    const titoloClean = titolo?.trim();
    const descrizioneClean = descrizione?.trim();
    const categoriaClean = categoria?.trim();
    const coverClean = cover?.trim();
    const readTimeClean = {
      value: readTime?.value,
      unit: readTime?.unit?.trim(),
    };

    if (descrizioneClean.length < 20) {
      return response.status(400).json({
        message:
          "La descrizione deve avere una lunghezza non inferiore a 20 caratteri",
      });
    }
    const newPost = Post({
      titolo: titoloClean,
      descrizione: descrizioneClean,
      readTime: readTimeClean,
      autore: request.autore._id,
      categoria: categoriaClean,
      cover: coverClean,
    });
    const postSaved = await newPost.save();
    response.status(201).json(postSaved);
    console.log({
      titoloClean,
      descrizioneClean,
      readTimeClean,
      autore,
      categoriaClean,
      coverClean,
    });
  } catch (error) {
    response.status(500).json({
      message: "Errore nella generazione del nuovo post",
      error: error.message,
    });
  }
}

export async function getSinglePost(request, response) {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non è valido" });
    }

    // Recupera il post e popola l'autore (solo nome e cognome)
    const post = await Post.findById(id).populate("autore", "nome cognome");

    if (!post) {
      return response.status(404).json({ message: "Post non trovato" });
    }

    // Garantisce che autore sia sempre un oggetto anche se mancante
    const postResponse = {
      ...post.toObject(),
      autore: post.autore
        ? { nome: post.autore.nome, cognome: post.autore.cognome }
        : { nome: "", cognome: "" },
    };

    response.status(200).json(postResponse);
  } catch (error) {
    console.error("Errore getSinglePost:", error);
    response
      .status(500)
      .json({ message: "Errore nella ricerca del post", error: error.message });
  }
}

export async function editPost(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    let { titolo, descrizione, readTime, categoria, cover } = request.body;

    const titoloClean = titolo?.trim();
    const descrizioneClean = descrizione?.trim();
    const categoriaClean = categoria?.trim();
    const coverClean = cover?.trim();
    const readTimeClean = {
      value: readTime?.value,
      unit: readTime?.unit?.trim(),
    };

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        titolo: titoloClean,
        descrizione: descrizioneClean,
        readTime: readTimeClean,
        categoria: categoriaClean,
        cover: coverClean,
      },
      { new: true, runValidators: true } //serve a far rispettare lo schema Mongoose anche nella PUT
    );
    if (!updatedPost) {
      return response.status(400).json({ message: "Post non trovato" });
    }
    response.status(200).json(updatedPost);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nella modifica del post", error });
  }
}

export async function deletePost(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return response.status(404).json({ message: "Post non trovato" });
    }
    response.status(200).json(deletedPost);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Non e' stato possibile eliminare il post" });
  }
}

export async function addNewCover(request, response) {
  try {
    console.log("File ricevuto da multer:", request.file);

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }

    if (!request.file) {
      return response.status(400).json({ message: "Nessun file caricato." });
    }

    const coverPath = request.file.path; // path restituito da Cloudinary
    const publicId = request.file.filename; //Cloudinary salva qui il public._id

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { cover: coverPath, coverPublicId: publicId },
      { new: true }
    );
    if (!updatedPost) {
      return response.status(404).json({ message: "Post non trovato." });
    }
    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({
      message: "Errore nel caricamento dell'immagine come cover",
      error,
    });
  }
}
