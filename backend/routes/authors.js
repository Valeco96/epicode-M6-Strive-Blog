import express from "express";
import {
  create,
  getAll,
  get,
  put,
  remove,
  addAvatar,
  removeAvatar,
  patch,
} from "../controllers/authors.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const authorsRouter = express.Router();

authorsRouter.get("/", getAll);
authorsRouter.post("/", create);
authorsRouter.get("/:id", get);
authorsRouter.put("/:id", put);
authorsRouter.patch("/:id", patch)
authorsRouter.patch(
  "/:id/avatar",
  uploadCloudinary.single("avatar"),
  addAvatar
);
authorsRouter.patch(
  "/:id/avatar/remove",
  removeAvatar
);
authorsRouter.delete("/:id", remove);

export default authorsRouter;
