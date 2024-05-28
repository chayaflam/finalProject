import express from "express";
import { ChatMessageController } from "../Controller/chatMessageController.js";

console.log("sadjjkhfabc")
const chatMessageRouter = express.Router();
const chatMessageController = new ChatMessageController()

chatMessageRouter.get("/", chatMessageController.hhh)

export {
    chatMessageRouter
}




