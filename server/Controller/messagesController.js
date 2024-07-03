import { MessagesService } from "../Service/messagesservice.js";
export class MessagesController {

    async getFeedingDataPerWeek(req, res, next) {
        try {
            console.log(req.params,"💛💛💛💛💛💛")

            const messagesService = new MessagesService();
            const resultItems = await messagesService.getFeedingData(req.params["id"])
            console.log(resultItems+"👩🏿‍🦰👩🏿‍🦰😋")
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