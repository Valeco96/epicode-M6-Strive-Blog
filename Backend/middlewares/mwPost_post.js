import Post from "../models/Post.js";

export async function validatePost(request, response, next) {
  const { titolo, descrizione, readTime, autore, categoria, cover } =
    request.body;
  const { id } = request.params;
  if (!titolo || !descrizione || !autore || !categoria || !cover) {
    return response
      .status(400)
      .json({ message: "I campi non compilati sono obbligatori" });
  }

  const filter = { $and: [{ titolo }] };
  if (id) {
    //eseguiamo una PUT
    filter.$and.push({ _id: { $ne: id } });
  }

  const Posts = await Post.find(filter);
  if (Posts.length > 0) {
    return response
      .status(400)
      .json({ message: "Il titolo scelto e' giá in uso" });
  }

  next();
}
