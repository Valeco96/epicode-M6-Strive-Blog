import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db.js";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import globalErrors from "./middlewares/globalErrors.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = express();
const port = process.env.PORT || 4000;

server.use(cors());
server.use(morgan("tiny"));
server.use(express.json());

server.get("/api", (request, response) => response.send({ username: "gigi" }));

//rotte
server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);
//middleware per gestione globale degli errori
server.use(globalErrors);

connectDB();

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
