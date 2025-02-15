import express from 'express';
import { 
  createSubscriptionPackage,
  getSubscriptionPackages,
  purchaseSubscription,
  checkSubscriptionStatus
} from "./../controllers/subscription.controller.js"
import { verifyJwt } from '../middleware/auth.middleware.js'; 
const router = express.Router();

router.post('/packages', createSubscriptionPackage);
router.get('/packages', getSubscriptionPackages);
router.post('/purchase', verifyJwt, purchaseSubscription);
router.get('/status', verifyJwt, checkSubscriptionStatus);

export default router;
