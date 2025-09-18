import Author from "../models/Author.js";

export async function login(request, response, next) {
  const { email, password } = request.body;

  const userEmail = await Author.findOne({ email });
}
