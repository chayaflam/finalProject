import express from "express";
import { ClassController } from "../Controller/classController.js";
import { authMiddleWare } from "../MiddleWare/authMiddleWare.js";



const classRouter = express.Router();
const classController = new ClassController()
classRouter.get("/teacher/:id",classController.getClass)

export {
    classRouter
}
