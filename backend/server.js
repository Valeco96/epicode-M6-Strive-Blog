import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db.js";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import globalErrors from "./middlewares/globalErrors.js";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(morgan("tiny"));
server.use(express.json());

server.get("/api", (request, response) => response.send({ username: "gigi" }));

server.use(globalErrors);
server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);

connectDB();

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
