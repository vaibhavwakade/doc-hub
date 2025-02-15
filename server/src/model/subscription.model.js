import mongoose from "mongoose";

const subscriptionPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  documentLimit: {
    type: Number,
    required: true,
    default:1
  },
  durationInMonths: {
    type: Number,
    required: true,
  },
  features: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

const userSubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPackage',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  documentCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const SubscriptionPackage = mongoose.model('SubscriptionPackage', subscriptionPackageSchema);
export const UserSubscription = mongoose.model('UserSubscription', userSubscriptionSchema);

