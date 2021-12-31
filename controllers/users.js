import userModel from "../models/users.js";
import contactModel from "../models/contact.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createAccessToken,
  createActivationToken,
  createRefreshToken,
} from "../utils/generateToken.js";
import config from "../config/keys.cjs";
import sendEmail from "../utils/sendMail.js";
import sendContactEmail from "../utils/sendContactMail.js";

const CLIENT_BASE_URL = config.CLIENT_BASE_URL;
const ACTIVATION_TOKEN_SECRET = config.ACTIVATION_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    return res.status(400).json({ err: errors.array() });
  }
  const { fullname, email, company_name, job_profile, password } = req.body;

  try {
    let user;
    user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ err: [{ msg: "This email already exists." }] });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = {
      fullname,
      email,
      company_name,
      job_profile,
      password: passwordHash,
    };

    const activation_token = createActivationToken(newUser);

    const url = `${CLIENT_BASE_URL}/user/activate/${activation_token}`;
    console.log(url);
    await sendEmail(email, url, "Verify your email address");

    res.json({
      msg: "Register Success! Please activate your email to start.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(400).json({ err: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: [{ msg: "This user doesn't exist." }] });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ err: [{ msg: "Incorrect password." }] });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.json({
      msg: "Login Success!",
      refresh_token,
      access_token,
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        company_name: user.company_name,
        job_profile: user.job_profile,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: [{ msg: "Server error" }] });
  }
};

export const activationEmail = async (req, res) => {
  try {
    const { activate_token } = req.body;
    const result = jwt.verify(activate_token, ACTIVATION_TOKEN_SECRET);
    const { fullname, email, company_name, job_profile, password } = result;
    const check = await userModel.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ err: [{ msg: "This email already exists." }] });
    }
    const newUser = new userModel({
      fullname,
      email,
      company_name,
      job_profile,
      password,
    });

    const user = await newUser.save();
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    res.json({
      refresh_token,
      access_token,
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        company_name: user.company_name,
        job_profile: user.job_profile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: [{ msg: "Server error" }] });
  }
};

export const accessToken = async (req, res) => {
  try {
    const { "x-auth-token": rf_token } = req.headers;
    if (!rf_token)
      return res.status(400).json({ err: [{ msg: "Please login now!" }] });

    const result = jwt.verify(rf_token, REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ err: [{ msg: "Your token is incorrect or has expired." }] });

    const user = await userModel.findById(result.id);
    if (!user)
      return res.status(400).json({ err: [{ msg: "User does not exist." }] });

    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        company_name: user.company_name,
        job_profile: user.job_profile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: [{ msg: "Server error" }] });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(400).json({ err: errors.array() });
    }
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({
        err: [
          { msg: "This Email Id is not registered.", alertType: "warning" },
        ],
      });

    const access_token = createAccessToken({ id: user._id });
    const url = `${CLIENT_BASE_URL}/user/reset/${access_token}`;

    await sendEmail(email, url, "Reset your password");
    res.json({ msg: "An Email has been sent to your mentioned ID." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: [{ msg: "Server error" }] });
  }
};

export const resetPassword = async (req, res) => {
  const { new_password } = req.body;
  try {
    const oldUser = await userModel.findById(req.user.id);
    const isMatch = await bcrypt.compare(new_password, oldUser.password);
    if (isMatch)
      return res
        .status(400)
        .json({ err: [{ msg: "New password cannot be same as old." }] });
    const passwordHash = await bcrypt.hash(new_password, 12);

    await userModel.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    const user = await userModel.findById(req.user.id);
    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    res.json({
      msg: "Your Password has been successfully changed",
      refresh_token,
      access_token,
      user: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        company_name: user.company_name,
        job_profile: user.job_profile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: [{ msg: "Server error" }] });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    const totalAdmin = users.filter((user) => user.role === "admin");
    if (req.user.id === req.params.id) {
      if (!(totalAdmin === 1)) {
        return res.status(500).json({ err: "Server error" });
      }
    }
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted Success!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server error" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const updatedRoleUser = req.body;
    await updatedRoleUser.map(
      async ({ id, role }) =>
        await userModel.findOneAndUpdate(
          { _id: id },
          {
            role: role,
          }
        )
    );
    res.json({ msg: "User role Updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server error" });
  }
};
export const contactUs = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(400).json({ err: errors.array() });
    }
    new contactModel({
      fullname,
      email,
      message,
    }).save();
    await sendContactEmail(email, fullname);
    res.json({
      msg: "Thank you for your feedback, please also check you email",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: [{ msg: "Server error" }] });
  }
};
