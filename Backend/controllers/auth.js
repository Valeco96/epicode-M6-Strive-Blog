import { signJWT } from "../helpers/jwt.js";
import Author from "../models/Author.js";

export async function login(request, response, next) {
  const { email, password } = request.body;

  const userEmail = await Author.findOne({ email });

  if (userEmail) {
    if (await userEmail.comparePassword(password)) {
      const jwt = await signJWT({
        id: userEmail._id,
      });
      return response
        .status(200)
        .json({ message: "Token generato con successo,", token: jwt });
    }
  }
  return response.status(400).json({ message: "Email o passowrd errati." });
}
