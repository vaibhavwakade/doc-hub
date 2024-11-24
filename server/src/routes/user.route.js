import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/registers").post(registerUser);
router.route("/logins").post(loginUser);
router.route("/logouts").post(verifyJwt, logoutUser);
router.route("/refresh-tokens").post(refreshAccessToken);
router.route("/change-passwords").post(verifyJwt, changeCurrentPassword);
router.route("/me").get(verifyJwt, getCurrentUser);
router.route("/update-accounts").patch(verifyJwt, updateAccountDetails);

export default router;
