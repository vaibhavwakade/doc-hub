import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  console.log("genrateAccessToken");
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      name: this.name,
    },
    config.jwtAccessSecret,
    {
      expiresIn: config.jwtAccessExpiration,
    }
  );
};
UserSchema.methods.generateRefreshToken = function () {
  console.log("generateRefreshToken-----userid", this._id);

  return jwt.sign(
    {
      _id: this._id,
    },
    config.jwtRefreshSecret,
    {
      expiresIn: config.jwtRefreshExpiration,
    }
  );
};

const User = mongoose.model("User", UserSchema);
export default User;
