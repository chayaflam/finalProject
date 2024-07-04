import express from "express";
import { MessagesController } from "../controller/messagesController.js";

const messagesRouter = express.Router();
const messagesController = new MessagesController()
messagesRouter.get("/:id",messagesController.getFeedingDataPerWeek)

export {
    messagesRouter
}
