import mongoose from "mongoose";

export const DocType = {
  Home: "home",
  Education: "education",
  Medical: "medical",
  GovDocuments: "gov document",
  Finance: "finance",
  MutualFunds: "mutual funds",
  Banking: "banking",
};

// Document Schema
const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
    },
    fileUrl: {
      type: String, // URL or path to the uploaded file
      required: true,
    },
    docType: {
      type: String,
      enum: Object.values(DocType), // Restrict values to DocType
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Mongoose model
const Document = mongoose.model("Document", DocumentSchema);
export default Document;
