import jwt from "jsonwebtoken";
import Author from "../models/Author.js";

export async function verifyJWTMiddleware(request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ message: "Token mancante o malformato" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const autore = await Author.findById(decoded.id);
    if (!autore) {
      return response.status(404).json({ message: "Autore non trovato" });
    }

    request.autore = autore;
    next();
  } catch (error) {
    response
      .status(401)
      .json({ message: "Token non valido", error: error.message });
  }
}
