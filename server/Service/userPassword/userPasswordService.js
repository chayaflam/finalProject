
import { executeQuery } from '../dataBase.js';
import { UserService } from "../userService.js";
import { getPasswordQuery } from './passwordQuery.js'

export class UserPasswordService {

    async login(user) {
        const authService = new UserService();
        const resultItem = await authService.getUserByUsername(user.username);
        if (resultItem) {
            const queryUserPassword = getPasswordQuery();
            const resultCheckPassword = await executeQuery(queryUserPassword, Object.values({ userId: resultItem.id, password: user.userPassword }));
            if (resultCheckPassword) {
                return resultItem;
            }
            return null;
        }
    }
}