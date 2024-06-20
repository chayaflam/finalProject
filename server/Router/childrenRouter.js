import express from "express";
import { ChildrenController } from "../Controller/childrenController.js";


const childrenRouter = express.Router();
const childrenController = new ChildrenController()

childrenRouter.get("/teacher/:id",childrenController.getChildrenByTeacher)

childrenRouter.get("/parent/:id",childrenController.getChildrenByParent)

export {
    childrenRouter
}
