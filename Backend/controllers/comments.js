import mongoose from "mongoose";
import Post from "../models/Post.js";
import Author from "../models/Author.js";

export async function getAllComments(request, response) {
  //recuperiamo l'id del post
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "L'id non e' valido" });
  }
  const post = await Post.findById(id);

  //Ora dobbiamo controllare che il post esista
  if (!post) {
    return response.status(404).json({ message: "Post non trovato." });
  }

  response.status(200).json(post.comments);
}

export async function createComments(request, response) {
  //prendiamo i dati del post dal body della request
  const { testo, autore } = request.body;
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(autore)) {
    return response
      .status(400)
      .json({ message: "L'id dell'autore non e' valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "L'id non e' valido" });
  }
  // selezionare l'autore e validare se esiste
  const autoreBD = await Author.findById(autore);
  if (!autore) {
    return response.status(404).json({ message: "Autore non trovato." });
  }
  //selezionare il post e validare se esiste
  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato." });
  }
  //Ora dobbiamo inserire il nuovo commento
  const newComment = { testo, autore };
  post.comments.push(newComment);
  await post.save();

  response.status(201).json(newComment);
}

export async function getSingleComment(request, response) {
  const { id, commentId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(400)
      .json({ message: "L'id dell'autore non e' valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: "L'id non e' valido" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato." });
  }

  const comment = post.comments.find((comment) => comment._id == commentId);
  if (!comment) {
    return response.status(404).json({ message: "Commento non trovato." });
  }

  response.status(200).json(comment);
}

export async function updateComment(request, response) {
  const { id, commentId } = request.params;
  const { testo, autore } = request.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(400)
      .json({ message: "L'id dell'autore non e' valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: "L'id non e' valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(autore)) {
    return response.status(400).json({ message: "L'id non e' valido" });
  }

  const autoreBD = await Author.findById(autore);
  if (!autore) {
    return response.status(404).json({ message: "Autore non trovato." });
  }

  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato." });
  }

  let comment = post.comments.find((comment) => comment._id == commentId);
  if (!comment) {
    return response.status(404).json({ message: "Commento non trovato." });
  }

  comment = {
    ...comment,
    testo,
    autore,
  };

  await post.save();
  response.status(200).json(comment);
}

export async function deleteComment(request, response) {
  const { id, commentId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(400)
      .json({ message: "L'id dell'autore non e' valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: "L'id non e' valido" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato." });
  }

  const comment = post.comments.find((comment) => comment._id == commentId);
  if (!comment) {
    return response.status(404).json({ message: "Commento non trovato." });
  }

  post.comments = post.comments.filter((comment) => comment._id != commentId);

  await post.save();

  return response.status(200).json(comment);
}
