import { UserService } from '../Service/userService.js'


export class UserController {

    async getUser(req, res, next) {
        try {
            const userService = new UserService();
            const resultItems = await userService.getUser()
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