import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { createDocument } from "../controllers/document.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/create").post(
  verifyJwt,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  createDocument
);

export default router;
