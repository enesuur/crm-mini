import { Router } from "express";
import { postRegister, postLogin, postLogout } from "../controllers/auth";

const authRouter = Router();

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", postRegister);

/**
 * @route POST /login
 * @desc Login an existing user
 * @access Public
 */
authRouter.post("/login", postLogin);

/**
 * @route POST /logout
 * @desc Logout user and clear cookie
 * @access Public (ya da protected, isteğe göre)
 */
authRouter.post("/logout", postLogout);

export default authRouter;
