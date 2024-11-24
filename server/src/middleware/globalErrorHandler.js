import { config } from "../config/config.js"; 

// Define the global error handler middleware function
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Determine the status code from the error or default to 500 (Internal Server Error)

  // Log the error (consider using a logging library in production)
  console.error(err);

  return res.status(statusCode).json({
    message: err.message, // The error message
    errorStack: config.env === "development" ? err.stack : "", // Include the error stack trace only in development mode
    status: statusCode, // Include the status code in the response
    // You can add additional fields here if needed
  });
};

export default globalErrorHandler; // Export the global error handler as the default export
