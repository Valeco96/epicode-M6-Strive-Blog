import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db.js";
import authorsRouter from "./routes/authors.js";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.get("/api", (request, response) => response.send({ username: "gigi" }));

server.use("/authors", authorsRouter);

connectDB();

server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
