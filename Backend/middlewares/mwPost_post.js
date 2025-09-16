import Post from "../models/Post.js";

export async function validatePost(request, response, next) {
  let { titolo, descrizione, readTime, autore, categoria } = request.body;

  const titoloClean = titolo?.trim().toLowerCase();

  const { id } = request.params;

  if (!titolo || !descrizione || !autore || !categoria) {
    return response
      .status(400)
      .json({ message: "I campi non compilati sono obbligatori" });
  }

  console.log("🛠 Validating post...");
  console.log("Request body:", request.body);
  console.log("Post ID:", id);

  const filter = { $and: [{ titolo: titoloClean }] };
  if (id) {
    //se é PUT, esclude il post corrente
    filter.$and.push({ _id: { $ne: id } });
  }

  console.log("Filtro duplicati:", JSON.stringify(filter, null, 2));

  const Posts = await Post.find(filter);
  if (Posts.length > 0) {
    return response
      .status(400)
      .json({ message: "Il titolo scelto e' giá in uso" });
  }

  next();
}
