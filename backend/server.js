import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db.js";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import globalErrors from "./middlewares/globalErrors.js";
import { v2 as cloudinary } from "cloudinary";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import { authVerifyAuthor } from "./middlewares/authVerifyAuthor.js";
import passport from "passport";
import googleStrategy from "./config/passport.config.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = express();
const port = process.env.PORT || 4000;

server.use(
  cors({
    origin: "http://localhost:5173", //permettiamo richieste solo da questo local host
    credentials: true, //usiamo auth headers
  })
);
server.use(morgan("tiny"));
server.use(express.json());

passport.use(googleStrategy);

//rotte
server.use("/auth", authRouter);
server.use("/authors", authVerifyAuthor, authorsRouter);
server.use("/posts", authVerifyAuthor, postsRouter);
server.use("/posts", authVerifyAuthor, commentsRouter);
//middleware per gestione globale degli errori
server.use(globalErrors);

connectDB();

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
