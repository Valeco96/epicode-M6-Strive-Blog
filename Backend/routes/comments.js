import express from "express";
import { validatePost } from "../middlewares/mwPost_post.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import { getAllComments } from "../controllers/comments.js";
import { createComments } from "../controllers/comments.js";
import { getSingleComment } from "../controllers/comments.js";
import { updateComment } from "../controllers/comments.js";
import { deleteComment } from "../controllers/comments.js";

const commentsRouter = express.Router();

commentsRouter.get("/:id/comments", getAllComments);
commentsRouter.post("/:id/comments", createComments);
commentsRouter.get("/:id/comments/:commentId", getSingleComment);
commentsRouter.put("/:id/comments/:commentId", updateComment);
//commentsRouter.patch(
//"/:id/cover",
//uploadCloudinary.single("cover"),
//addNewCover
//); // cover é il nome del campo che devo passare
commentsRouter.delete("/:id/comments/:commentId", deleteComment);

export default commentsRouter;
