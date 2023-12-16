import jwt from "jsonwebtoken";
import { settingDotEnvDB } from "../config/dotenv.js";

const { secretToken } = settingDotEnvDB();

export const createAccessToken = (payload) => {
  return jwt.sign(payload, secretToken, { expiresIn: "10h" });
};
