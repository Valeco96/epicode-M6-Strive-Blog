import express from "express";
import { create, getAll, get, put, remove } from "../controllers/authors.js";

const authorsRouter = express.Router();

authorsRouter.get("/", getAll);
authorsRouter.post("/", create);
authorsRouter.get("/:id", get);
authorsRouter.put("/:id", put);
authorsRouter.delete("/:id", remove);

export default authorsRouter;
