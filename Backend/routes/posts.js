import express from "express";
import {
  addNewCover,
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getSinglePost,
} from "../controllers/posts.js";
import { validatePost } from "../middlewares/mwPost_post.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", validatePost, createPost);
postsRouter.get("/:id", getSinglePost);
postsRouter.put("/:id", validatePost, editPost);
postsRouter.patch("/:id", validatePost, editPost);
postsRouter.patch("/:id/cover", uploadCloudinary.single("cover"), addNewCover); // cover é il nome del campo che devo passare
postsRouter.delete("/:id", deletePost);

export default postsRouter;
