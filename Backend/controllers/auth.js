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

export async function signUp(request, response, next) {
  try {
    const { nome, cognome, email, password, dataDiNascita } = request.body;

    //controlla se l'email esiste già
    const existingAuthor = await Author.findOne({ email });
    if (existingAuthor) {
      return response.status(400).json({ message: "Email già in uso." });
    }

    //Crea un nuovo autore
    const nuovoAutore = new Author({
      nome,
      cognome,
      email,
      password, //questa viene hashata dal metodo pre-save (impostato nello schema)
      dataDiNascita,
      avatar: request.file?.path, //se c’è file caricato su Cloudinary
    });

    await nuovoAutore.save();

    //genera JWT
    const token = await generateJWT({ id: nuovoAutore._id });

    //manda la risposta
    response.status(201).json({
      message: "Nuovo autore creato con successo",
      token,
      autore: {
        id: nuovoAutore._id,
        nome: nuovoAutore.nome,
        cognome: nuovoAutore.cognome,
        email: nuovoAutore.email,
        avatar: nuovoAutore.avatar,
      },
    });
  } catch (error) {
    console.error("Errore in signUp:", error);
    response
      .status(500)
      .json({ message: "Errore durante la registrazione", error });
    next(error);
  }
}
