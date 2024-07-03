import express from "express";
import { AuthController } from '../Controller/authController.js'
import { authMiddleWare } from "../MiddleWare/authMiddleWare.js";
const authRouter = express.Router();
const authController = new AuthController()

authRouter.post("/login", authController.getAuthLogin)

export {
    authRouter
}