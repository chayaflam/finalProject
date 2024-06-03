import { ChildrenService } from '../Service/childrenService.js';
import { sha256 } from 'js-sha256'

export class ChildrenController {

    async getChildren(req, res, next) {
        try {
            console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggg   "+req.params["id"])
            const childrenService = new ChildrenService();
            const resultItems = await childrenService.getChildren(req.params["id"])
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}