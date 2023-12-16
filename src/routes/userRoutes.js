import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  verifyToken,
} from "../controllers/userControllers.js";
import { authRequired } from "../middlewares/tokenValidation.js";
import {
  validateRegister,
  validateLogin,
  handleErrorValidations,
} from "../middlewares/userValidation.js";

const userRouter = Router();

// /register
userRouter.post("/register", validateRegister, handleErrorValidations, register);

// /login
userRouter.post("/login", validateLogin, handleErrorValidations, login);

// /logout
userRouter.post("/logout", logout);

// /verifyToken
userRouter.get("/verifyToken", verifyToken);

// /profile
userRouter.get("/profile", authRequired, profile);

export default userRouter;