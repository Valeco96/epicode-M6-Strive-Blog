import express from "express";
import {
  create,
  getAll,
  get,
  put,
  remove,
  addAvatar,
  removeAvatar,
} from "../controllers/authors.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const authorsRouter = express.Router();

authorsRouter.get("/", getAll);
authorsRouter.post("/", create);
authorsRouter.get("/:id", get);
authorsRouter.put("/:id", put);
authorsRouter.patch(
  "/:id/avatar",
  uploadCloudinary.single("avatar"),
  addAvatar
);
authorsRouter.patch(
  "/:id/avatar/remove",
  uploadCloudinary.single("avatar"),
  removeAvatar
);
authorsRouter.delete("/:id", remove);

export default authorsRouter;
