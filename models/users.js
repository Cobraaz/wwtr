import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    company_name: { type: String, required: true },
    job_profile: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "external_user",
      enum: ["internal_user", "external_user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
