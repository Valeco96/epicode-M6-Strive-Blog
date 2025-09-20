import { verifyJWT } from "../helpers/jwt.js";
import Author from "../models/Author.js";

export async function authVerifyAuthor(request, response, next) {
  const headerAuth = request.headers.authorization || "";

  const token = headerAuth.replace("Bearer ", "");
  if (!token) {
    return response.status(404).json({ message: "Token mancante." });
  }

  try {
    const payload = verifyJWT(token);
    const autore = await Author.findById(payload.id);
    if (!autore) {
      return response.status(401).json({ message: "Utente non trovato." });
    }
    request.autore = autore;
    next();
  } catch (error) {
    response.status(401).json({ message: "Token non trovato o mancante." });
  }
}
