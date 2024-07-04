import { executeQuery } from './dataBase.js';
import { getPasswordQuery } from './queries/passwordQuery.js';
import jwt from 'jsonwebtoken'
import { UserService } from './userService.js';

export class UserPasswordService {

    async login(user) {
        const authService = new UserService();
        const resultItem = await authService.getUserByUsername(user.username);//
        if (!resultItem)
            return null;
        const queryUserPassword = getPasswordQuery();
        const resultCheckPassword = await executeQuery(queryUserPassword, Object.values({ userId: resultItem.id, password: user.userPassword }));
        if (!resultCheckPassword)
            return null
        const payload = {id: resultItem.id, email: resultItem.email};
        return {
            resultItem: resultItem,
            token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_OPTIONS })
        };
    }
}


