import { app } from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import Razorpay from "razorpay";

const startServer = async () => {
  await connectDB();
  const port = config.port || 5000;
  app.listen(port, () => {
    console.log(`⚙️ Server is running on port ${port}`);
  });
};
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
startServer();

