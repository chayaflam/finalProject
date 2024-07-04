import { UserPasswordService } from "../service/userPasswordService.js";

export class AuthController {

    async getAuthLogin(req, res, next) {
        try {
            const passwordService = new UserPasswordService();
            const result = await passwordService.login(req.body);
            if (!result) throw new Error("No elements found");
            return res.cookie('token', result.token,
                { secure: false, httpOnly: true }
            ).json({ result: result.resultItem, token: result.token })
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}

