
import {sha256} from 'js-sha256'
import { ClassService } from '../Service/classService.js';

export class ClassController {

    async getClass(req, res, next) {
        try {
            const classService = new ClassService();
            const resultItems = await classService.getIdClass({ data: req.params["id"], condition: "teacherId" })
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