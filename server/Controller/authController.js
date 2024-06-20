import { UserPasswordService } from "../Service/userPassword/userPasswordService.js";
import { logErrors } from "../MiddleWare/logError.js";

export class AuthController {

    async getAuthLogin(req, res, next) {
        try {
            const passwordService = new UserPasswordService();
            const result = await passwordService.login(req.body);
            console.log("resultLogin " + result)
            if (result){
            
                return res.status(200).json({ result: result.resultItem, token: result.token });
            }
           //return res.status(404).json({ status: 404 ,massage});
          throw new Error("No elements found")
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

