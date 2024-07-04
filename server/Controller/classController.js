
import {sha256} from 'js-sha256'
import { ClassService } from '../service/classService.js';

export class ClassController {

    async getClass(req, res, next) {
        try {
            const classService = new ClassService();
            const resultItems = await classService.getIdClass({ data: req.params["id"], condition: "teacherId" })
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
 
}