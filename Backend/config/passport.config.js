import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import Author from "../models/Author.js";

const googleStrategy = new GoogleStrategy(
  //questo serve per cacciare il pop up di google
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_PATH}`, //indirizzo che deve essere registrato, altrimenti non procede
  },
  //callback che si attiva quando google ci passa i dati del profilo
  async function (accessToken, refreshToken, profile, callback) {
    // profile prende i dati che ci passa google, callback che usiamo e dobbiamo recuperare
    console.log(profile);
    try {
      let autore = await Author.findOne({ googleId: profile.id });
      //se l'utente non esiste lo creiamo
      if (!autore) {
        autore = await Author.create({
          nome: profile.nome?.givenName || profile.displayName,
          cognome: profile.cognome?.familyName || "",
          email: profile.emails?.[0]?.value,
          googleId: profile.id,
          avatar: profile.photos?.[0]?.value,
        });
      }
      //ora gli creiamo il jwt
      const jwt = await generateJWT({ id: autore.id });
      callback(null, { autore, jwt }); //oggetto finisce in request.autore
    } catch (error) {
      callback(error, null);
    }
  }
);

export default googleStrategy;
