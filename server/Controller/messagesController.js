import { MessagesService } from "../service/messagesservice.js";

export class MessagesController {

    async getFeedingDataPerWeek(req, res, next) {
        try {
            const messagesService = new MessagesService();
            const resultItems = await messagesService.getFeedingData(req.params["id"])
            return res.json(resultItems)
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}