import express from "express";
import { UserController } from '../Controller/userController.js'
import { authMiddleWare } from "../MiddleWare/authMiddleWare.js";


const userRouter = express.Router();
const userController = new UserController()

userRouter.get("/",authMiddleWare, userController.getUser)

export {
    userRouter
}
