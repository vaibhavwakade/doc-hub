import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Define __filename and __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const upload = multer({
  dest: path.resolve(__dirname, "../../public/uploads"),
  limits: {
    fileSize: 3e7, // Set file size limit to 30 MB
  },
});
