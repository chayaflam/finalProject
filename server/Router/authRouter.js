import express from "express";
import { AuthController } from '../Controller/authController.js'
import { authMiddleWare } from "../MiddleWare/authMiddleWare.js";
const authRouter = express.Router();
const authController = new AuthController()

authRouter.post("/login", authController.getAuthLogin)
authRouter.get("/test", (req, res, next) => {
    return res.cookie('token', "uiujg",
        { secure: false, httpOnly: true }
    ).send("ok")

})


export {
    authRouter
}