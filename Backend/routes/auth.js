import { login, signUp } from "../controllers/auth.js";
import express from "express";
import passport from "passport";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import { signJWT } from "../helpers/jwt.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", uploadCloudinary.single("avatar"), signUp);
authRouter.get(
  "/login-google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
authRouter.get(
  "/callback-google",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }), //stiamo usando react, che non usa cookies (gli diciamo di non usarli)
  async (request, response) => {
   try {
     // Passport mette il risultato della strategia in req.user
     const { jwt } = req.user;

     // Redirigiamo al frontend passando il token come query
     res.redirect(`${process.env.FRONTEND_HOST}/login?token=${jwt}`);
   } catch (error) {
     console.error("Errore callback Google:", error);
     res.status(500).send("Errore durante il login con Google");
   }
  }
);

export default authRouter;
