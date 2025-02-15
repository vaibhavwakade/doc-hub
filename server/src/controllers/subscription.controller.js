import asyncHandler from "express-async-handler";
import { SubscriptionPackage, UserSubscription } from "./../model/subscription.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Document } from "../model/document.modal.js";

// Create a subscription package (admin only)
export const createSubscriptionPackage = asyncHandler(async (req, res) => {
  const { name, price, documentLimit, durationInMonths, features } = req.body;

  if (!name || !price || !documentLimit || !durationInMonths) {
    return res.status(400).json(
      new ApiResponse(400, null, "All fields are required")
    );
  }

  const packages = await SubscriptionPackage.create({
    name,
    price,
    documentLimit,
    durationInMonths,
    features
  });

  res.status(201).json(
    new ApiResponse(201, packages, "Subscription package created successfully")
  );
});

// Get all active subscription packages
export const getSubscriptionPackages = asyncHandler(async (req, res) => {
  const packages = await SubscriptionPackage.find({ status: 'active' });
  res.status(200).json(
    new ApiResponse(200, packages, "Subscription packages retrieved successfully")
  );
});

// Purchase a subscription
export const purchaseSubscription = asyncHandler(async (req, res) => {
  const { packageId } = req.body;
  const userId = req.user._id;

  // Check if package exists
  const subscriptionPackage = await SubscriptionPackage.findById(packageId);
  if (!subscriptionPackage) {
    return res.status(404).json(
      new ApiResponse(404, null, "Subscription package not found")
    );
  }

  // Check if user has any active subscription
  const activeSubscription = await UserSubscription.findOne({
    user: userId,
    status: 'active',
    endDate: { $gt: new Date() }
  });

  if (activeSubscription) {
    return res.status(400).json(
      new ApiResponse(400, null, "You already have an active subscription")
    );
  }

  // Calculate subscription dates
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + subscriptionPackage.durationInMonths);

  // Create user subscription
  const userSubscription = await UserSubscription.create({
    user: userId,
    package: packageId,
    startDate,
    endDate,
    documentCount: 0
  });

  res.status(201).json(
    new ApiResponse(201, userSubscription, "Subscription purchased successfully")
  );
});

// Check user's subscription status and document limit
export const checkSubscriptionStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const subscription = await UserSubscription.findOne({
    user: userId,
    status: 'active',
    endDate: { $gt: new Date() }
  }).populate('package');

  if (!subscription) {
    return res.status(200).json(
      new ApiResponse(200, {
        hasSubscription: false,
        remainingDocuments: 7 - await Document.countDocuments({ author: userId }),
        isFreeTier: true
      }, "User is on free tier")
    );
  }

  const remainingDocuments = subscription.package.documentLimit - subscription.documentCount;

  res.status(200).json(
    new ApiResponse(200, {
      hasSubscription: true,
      subscription,
      remainingDocuments,
      isFreeTier: false
    }, "Subscription status retrieved successfully")
  );
});

// Middleware to check document limits
export const checkDocumentLimit = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  // Check active subscription
  const subscription = await UserSubscription.findOne({
    user: userId,
    status: 'active',
    endDate: { $gt: new Date() }
  }).populate('package');

  // Count user's documents
  const documentCount = await Document.countDocuments({ author: userId });

  if (!subscription) {
    // Free tier check
    if (documentCount >= 7) {
      return res.status(403).json(
        new ApiResponse(403, null, "Free tier document limit reached. Please upgrade to a subscription.")
      );
    }
  } else {
    // Subscription tier check
    if (documentCount >= subscription.package.documentLimit) {
      return res.status(403).json(
        new ApiResponse(403, null, "Subscription document limit reached. Please upgrade your plan.")
      );
    }
    
    // Update document count in subscription
    subscription.documentCount = documentCount + 1;
    await subscription.save();
  }

  next();
});