import express from "express"
import { checkout, paymentVerification } from "../controllers/Payment.controller.js"

const route = express.Router()
route.post("/checkout",checkout);
route.post("/paymentverification",paymentVerification);

export default route