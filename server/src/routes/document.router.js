import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  createDocument,
  deleteDocument,
  getUserDocumentsByType,
  updateDocument,
} from "../controllers/document.controller.js";
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

router.route("/user-documents").get(verifyJwt, getUserDocumentsByType);
router.route("/update/:documentId").patch(verifyJwt, updateDocument);
router.route("/delete/:documentId").delete(verifyJwt, deleteDocument);

export default router;
