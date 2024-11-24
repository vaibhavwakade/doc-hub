import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Document } from "../model/document.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createDocument = asyncHandler(async (req, res) => {
    const { title, description, docType } = req.body;
  
    if (!title || !description || !docType) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "All fields are required: title, description, docType"
          )
        );
    }
  
    const validDocTypes = [
      "home",
      "education",
      "medical",
      "gov document",
      "finance",
      "mutual funds",
      "banking",
    ];
  
    if (!validDocTypes.includes(docType)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid docType provided"));
    }
  
    const author = req.user._id;
    if (!author) {
      return res.status(400).json(new ApiResponse(400, null, "User not found"));
    }
  
    const files = req.files;
  
    if (!files || !files.file || !files.file[0]) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Please upload a file"));
    }
  
    const uploadPdfFileName = files.file[0].filename;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(
      __dirname,
      "../../public/uploads",
      uploadPdfFileName
    );
  
    const uploadPdfFileResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      filename_override: uploadPdfFileName,
      folder: "documents-doc-navigator",
      format: "pdf",
    });
  
    try {
      // Calculate expiry date
      const creationDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(creationDate.getMonth() + 1); // Add 1 month to creation date
  
      const document = await Document.create({
        title,
        description,
        fileUrl: uploadPdfFileResult.secure_url,
        docType,
        expiryDate,
        author,
      });
  
      // Delete the local file after successful upload
      await fs.promises.unlink(filePath);
  
      res
        .status(201)
        .json(new ApiResponse(201, document, "Document created successfully"));
    } catch (error) {
      // Handle errors
      res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            "An error occurred while creating the document"
          )
        );
    }
  });
  
