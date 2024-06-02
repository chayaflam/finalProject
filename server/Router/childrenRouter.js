import express from "express";
import { ChildrenController } from "../Controller/childrenController.js";


const childrenRouter = express.Router();
const childrenController = new ChildrenController()
childrenRouter.get("/:id",childrenController.getChildren)

export {
    childrenRouter
}
