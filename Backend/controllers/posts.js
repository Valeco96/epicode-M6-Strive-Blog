import mongoose from "mongoose";
import Post from "../models/Post.js";

export async function getAllPosts(request, response) {
  try {
    const posts = await Post.find();
    response.status(200).json(posts);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero dei post", error });
  }
}

export async function createPost(request, response) {
  try {
    const { titolo, descrizione, readTime, autore, categoria, cover } =
      request.body;

    titolo = titolo?.trim();
    descrizione = descrizione?.trim();
    autore = autore?.trim();
    categoria = categoria?.trim();
    cover = cover?.trim();
    readTime = {
      value: readTime?.value?.trim(),
      unit: readTime?.unit?.trim(),
    };

    if (!titolo || !descrizione || !autore || !categoria || !cover) {
      return response
        .status(400)
        .json({ message: "I campi non compilati sono obbligatori" });
    }

    if (descrizione.lenght < 20) {
      return response.status(400).json({
        message:
          "La descrizione deve avere una lunghezza non inferiore a 20 caratteri",
      });
    }
    const newPost = Post({
      titolo,
      descrizione,
      readTime,
      autore,
      categoria,
      cover,
    });
    const postSaved = await newPost.save();
    response.status(201).json(postSaved);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nella generazione del nuovo post", error });
  }
}

export async function getSinglePost(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return response.status(404).json({ message: "Post non trovato" });
    }
    response.status(200).json(post);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nella ricerca del post", error });
  }
}

export async function editPost(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "L'id non e' valido" });
    }
    const { titolo, descrizione, timeRead, autore, categoria, cover } =
      request.body;

    titolo = titolo?.trim();
    descrizione = descrizione?.trim();
    autore = autore?.trim();
    categoria = categoria?.trim();
    cover = cover?.trim();
    readTime = {
      value: readTime?.value?.trim(),
      unit: readTime?.unit?.trim(),
    };

    if (!titolo || !descrizione || !autore || !categoria || !cover) {
      return response
        .status(400)
        .json({ message: "I campi non compilati sono obbligatori" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        titolo,
        descrizione,
        readTime,
        autore,
        categoria,
        cover,
      },
      { new: true }
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
