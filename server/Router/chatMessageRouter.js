import express from "express";
import { ChatMessageController } from "../Controller/chatMessageController.js";

const chatMessageRouter = express.Router();
const chatMessageController = new ChatMessageController()

chatMessageRouter.get("/", chatMessageController.test1)

export {
    chatMessageRouter
}




