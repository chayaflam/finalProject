import express from "express";
import { ChatMessageController } from "../Controller/chatMessageController.js";

const chatMessageRouter = express.Router();
const chatMessageController = new ChatMessageController()

console.log("hyjufydiulrjyguy😋🎁🛹")
chatMessageRouter.get("/", chatMessageController.test1)

export {
    chatMessageRouter
}




