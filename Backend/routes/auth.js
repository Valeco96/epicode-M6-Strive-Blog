import { login, signUp } from "../controllers/auth.js";
import express from "express";
import passport from "passport";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", uploadCloudinary.single("avatar"), signUp);
authRouter.get(
  "/login-google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/callback-google",
  passport.authenticate("google", { session: false }),
  (request, response) => {
    response.redirect(
      process.env.FRONTEND_HOST + "/login?jwt" + request.user.jwt
    );
  }
);

export default authRouter;
