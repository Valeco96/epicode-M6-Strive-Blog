import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import Author from "../models/Author.js";

const googleStrategy = new GoogleStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_PATH}`,
  },
  async function (accessToken, refreshToken, profile, callback) {
    try {
      let autore = await Author.findOne({ googleId: profile.id });
      if (!autore) {
        autore = await Author.create({
          nome: profile.nome,
          cognome: profile.cognome,
          dataDiNascita: profile.dataDiNascita,
          email: profile.email,
          password: profile.password,
          avatar: profile.avatar,
        });
      }
      const jwt = await generateJWT({ id: autore._id });
      callback(null, { autore, jwt });
    } catch (error) {
      callback(error, null);
    }
  }
);

export default googleStrategy;
