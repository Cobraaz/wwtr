import userModel from "../models/users.js";

const AuthenticatedRoot = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    if (user.role !== "admin")
      return res.status(500).json({ err: "Root resources access denied." });

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ err: "you must logged in" });
  }
};

export default AuthenticatedRoot;
