import { ChildrenService } from '../Service/childrenService.js';
import { sha256 } from 'js-sha256'

export class ChildrenController {

    async getChildrenByTeacher(req, res, next) {
        try {
            console.log("🍕🍕🥙🧀🥖")
            const childrenService = new ChildrenService();
            const resultItems = await childrenService.getChildren({data:req.params["id"],condition:"teacherId"})
            console.log(Object.values(resultItems))
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getChildrenByParent(req, res, next) {
        try {
            const childrenService = new ChildrenService();
            const resultItems = await childrenService.getChildren({data:req.params["id"],condition:"parentId"})
            console.log(Object.values(resultItems))
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