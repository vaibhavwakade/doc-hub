import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { config } from "../config/config.js";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email, mobile } = req.body;

  if (!name || !password || !email || !mobile) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "All fields are required : name password email mobile"
        )
      );
  }
  const existedUser = await User.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, `User already with email : ${email} `));
  }

  const user = await User.create({
    name,
    email,
    password,
    mobile,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User creation failed"));
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Email are required"));
  }
  const user = await User.findOne({
    $or: [{ email }],
  });
  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User with this email not found"));
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Password is incorrect"));
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
    withCredentials: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged  in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  
  const incomingRefreshToken =
  req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    console.log("refreshToken-", req.cookies);
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Refresh token is required to refresh"));
  }

  try {
    const userToken = jwt.verify(
      incomingRefreshToken,
      config.jwtRefreshSecret
    );
    const user = await User.findById(userToken?._id);
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "User does not exist"));
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Refresh Token Expired or Invalid"));
    }
    const option = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", newRefreshToken, option)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access Token  Refreshed"
        )
      );
  } catch (error) {
    return res
      .status(403)
      .json(
        new ApiResponse(403, error.message, "Refresh Token Expired or Invalid")
      );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassWord } = req.body;
  if (!oldPassword || !newPassWord) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "All fields are required - oldPassword, newPassWord"
        )
      );
  }

  const user = await User.findById(req.user.id);
  const isPassWordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPassWordCorrect) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Old password is incorrect"));
  }
  user.password = newPassWord;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, mobile } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        name,
        email,
        mobile,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken -__v");
  return res.status(200).json(new ApiResponse(200, user, "User updated"));
});


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
};
