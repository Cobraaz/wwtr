import jwt from "jsonwebtoken";
import config from "../config/keys.cjs";

const ACTIVATION_TOKEN_SECRET = config.ACTIVATION_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;

export const createActivationToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

export const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
