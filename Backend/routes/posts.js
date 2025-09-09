import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getSinglePost,
} from "../controllers/posts.js";
import { validatePost } from "../middlewares/mwPost_post.js";

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", validatePost, createPost);
postsRouter.get("/:id", getSinglePost);
postsRouter.put("/:id", validatePost, editPost);
postsRouter.delete("/:id", deletePost);

export default postsRouter;
