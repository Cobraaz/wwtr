import jwt from "jsonwebtoken";
import userModel from "../models/users.js";
import config from "../config/keys.cjs";

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;

const Authenticated = async (req, res, next) => {
  const { "x-auth-token": token } = req.headers;
  if (!token) {
    return res.status(401).json({ error: "you must logged in" });
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decoded)
      return res.status(400).json({ err: "Invalid Authentication." });

    const user = await userModel.findOne({ _id: decoded.id });
    req.user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "you must logged in" });
  }
};

export default Authenticated;
