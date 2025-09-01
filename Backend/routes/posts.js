import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getSinglePost,
} from "../controllers/posts.js";

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", createPost);
postsRouter.get("/:id", getSinglePost);
postsRouter.put("/:id", editPost);
postsRouter.delete("/:id", deletePost);

export default postsRouter;
