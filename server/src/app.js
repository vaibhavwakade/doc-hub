import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import userRouter from "./routes/user.route.js";
import documentRouter from "./routes/document.router.js";
import suscritipion from "./routes/subscription.routes.js" 
import { scheduleExpiryNotifications } from "./controllers/nodemaler.controller.js";
import paymentRoutes from "./routes/PAyment.routes.js";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
scheduleExpiryNotifications();
app.use("/api/v1/user", userRouter);
app.use('/api/v1/document', documentRouter);
app.use('/api/v1/suscription', suscritipion);
app.use('/api/v1/payment', paymentRoutes);

app.get("/api/getkey", async (req, res) => {
  console.log(process.env.RAZORPAY_APT_SECRET);
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

app.use(globalErrorHandler);
export { app };

