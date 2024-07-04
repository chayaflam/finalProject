import express from "express";
import { AuthController } from '../controller/authController.js'

const authRouter = express.Router();
const authController = new AuthController()

authRouter.post("/login", authController.getAuthLogin)

export {
    authRouter
}