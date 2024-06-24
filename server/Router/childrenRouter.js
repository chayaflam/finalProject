import express from "express";
import { ChildrenController } from "../Controller/childrenController.js";
import { authMiddleWare } from "../MiddleWare/authMiddleWare.js";

const childrenRouter = express.Router();
const childrenController = new ChildrenController()

childrenRouter.get("/teacher/:id",authMiddleWare,childrenController.getChildrenByTeacher)

childrenRouter.get("/parent/:id",authMiddleWare,childrenController.getChildrenByParent)

export {
    childrenRouter
}
