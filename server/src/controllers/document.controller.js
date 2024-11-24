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

export const getUserDocumentsByType = asyncHandler(async (req, res) => {
  const { docType } = req.query;
  const userId = req.user._id;

  if (!docType) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Document type (docType) is required"));
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

  try {
    // Fetch documents created by the user with the given docType
    const documents = await Document.find({
      author: userId,
      docType: docType,
      expiryDate: { $gt: new Date() },
      status: "active",
    }).sort({
      createdAt: -1,
    });

    if (documents.length === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            "No documents found for this user and docType"
          )
        );
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, documents, "Documents retrieved successfully")
      );
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while retrieving documents"
        )
      );
  }
});

export const updateDocument = asyncHandler(async (req, res) => {
  const { documentId } = req.params; // Document ID from URL parameter
  const { title, description, docType } = req.body; // Fields to update

  if (!req.user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "User not authenticated"));
  }

  if (!documentId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Document ID is required"));
  }

  if (!title && !description && !docType) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "At least one field (title, description, or docType) is required to update"
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

  if (docType && !validDocTypes.includes(docType)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid docType provided"));
  }

  try {
    // Find the document by its ID and the author (to ensure the user can only update their documents)
    const document = await Document.findOne({
      _id: documentId,
      author: req.user._id,
    });

    if (!document) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            "Document not found or you don't have permission to update it"
          )
        );
    }

    // Update the document fields if provided
    if (title) document.title = title;
    if (description) document.description = description;
    if (docType) document.docType = docType;

    // Save the updated document
    const updatedDocument = await document.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedDocument._id,
          "Document updated successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while updating the document"
        )
      );
  }
});

export const deleteDocument = asyncHandler(async (req, res) => {
  const { documentId } = req.params; // Document ID from URL parameter

  if (!req.user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "User not authenticated"));
  }

  if (!documentId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Document ID is required"));
  }

  try {
    // Find the document by its ID and the author (to ensure the user can only delete their documents)
    const document = await Document.findOne({
      _id: documentId,
      author: req.user._id,
    });

    if (!document) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            null,
            "Document not found or you don't have permission to delete it"
          )
        );
    }

    // Delete the document from the database
    await document.deleteOne();

    // If the file was uploaded to Cloudinary, delete it from Cloudinary
    if (document.fileUrl) {
      const publicId = document.fileUrl.split("/").pop().split(".")[0]; // Extract the publicId from the URL
      await cloudinary.uploader.destroy(`documents-doc-navigator/${publicId}`, {
        resource_type: "raw", // Since it's a raw file (e.g., PDF)
      });
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Document deleted successfully"));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while deleting the document"
        )
      );
  }
});
