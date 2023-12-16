import jwt from "jsonwebtoken";
import { settingDotEnvDB } from "../config/dotenv.js";

const { secret } = settingDotEnvDB();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Authorization denied, please log in again" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: "Token has expired" });
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    } else {
      req.user = decoded;
      next();
    }
  });
};
