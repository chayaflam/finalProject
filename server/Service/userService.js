import { executeQuery } from "./dataBase.js";
import { getByParamQuery, getQuery } from "./queries/genericQuery.js";


export class UserService {

    async getUser() {
        const queryUser = getQuery("user");
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserByUsername(username) {
        const queryUser = getByParamQuery("user", "username");
        const result = await executeQuery(queryUser, [username]);
        return result[0] ? result[0] : null;
    }
}