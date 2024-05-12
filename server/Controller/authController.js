import { UserPasswordService } from "../Service/userPassword/userPasswordService.js";
import { logErrors } from "../MiddleWare/logError.js";

export class AuthController {

    async getAuthLogin(req, res, next) {
        try {
            const passwordService = new UserPasswordService();
            const result = await passwordService.login(req.body);
            if (result)
                return res.status(200).json(result);
            const err = { statusCode: 401, message: "Login failed" }
            return res.status(401).json(logErrors(err, req, res, next))
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }

}

