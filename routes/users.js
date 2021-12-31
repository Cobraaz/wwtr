import express from "express";
const router = express.Router();
import { check } from "express-validator";

import {
  signup,
  signin,
  activationEmail,
  accessToken,
  forgetPassword,
  resetPassword,
  getAllUsers,
  deleteUser,
  updateRole,
  contactUs,
} from "../controllers/users.js";
import Authenticated from "../middleware/Authenticated.js";
import AuthenticatedRoot from "../middleware/AuthenticatedRoot.js";

router.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").isLength({
      min: 6,
      max: 16,
    }),
  ],
  signin
);
router.post(
  "/signup",
  [
    check("fullname", "Name is required").not().isEmpty(),
    check("company_name", "Comapny Name is required").not().isEmpty(),
    check("job_profile", "Job Profile is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be between 4 to 16 characters").isLength({
      min: 6,
      max: 16,
    }),
    check("confirm_password", "Password must be between 4 to 16 characters")
      .isLength({ min: 4, max: 16 })
      .custom(async (confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword) {
          throw new Error("Passwords must be same");
        }
      }),
  ],
  signup
);
router.post(
  "/forget_password",
  [check("email", "Please include a valid email").isEmail()],
  forgetPassword
);
router.patch(
  "/reset_password",
  [
    check("password", "Password must be between 4 to 16 characters").isLength({
      min: 6,
      max: 16,
    }),
    check("confirm_password", "Password must be between 4 to 16 characters")
      .isLength({ min: 4, max: 16 })
      .custom(async (confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword) {
          throw new Error("Passwords must be same");
        }
      }),
  ],
  Authenticated,
  resetPassword
);
router.post("/activation_email", activationEmail);
router.get("/access_token", accessToken);
router.get("/all_infor", Authenticated, AuthenticatedRoot, getAllUsers);
router.delete("/delete_user/:id", Authenticated, AuthenticatedRoot, deleteUser);
router.patch("/update_role", Authenticated, AuthenticatedRoot, updateRole);
router.post(
  "/contact_us",
  [
    check("fullname", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("message", "Message is required").not().isEmpty(),
  ],
  contactUs
);
export default router;
