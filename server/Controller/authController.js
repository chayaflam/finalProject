import { UserPasswordService } from "../Service/userPassword/userPasswordService.js";
import { logErrors } from "../MiddleWare/logError.js";
export class AuthController {
    async getAuthLogin(req, res, next) {
        try {
            const passwordService = new UserPasswordService();
            const result = await passwordService.login(req.body);
            console.log("resultLogin " + result)
            if (!result) throw new Error("No elements found");
            return res.json({ result: result.resultItem, token: result.token })

          
        }
        catch (ex) {
            const err = {};
            switch (ex.message) {
                case "No elements found":
                    err.statusCode = 404;
                    break;
                case "Element already exists":
                    err.statusCode = 409;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex.message;
            next(err);
        }
    }
}

