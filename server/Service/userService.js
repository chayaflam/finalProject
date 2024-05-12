
import { executeQuery } from './dataBase.js';
import { getQuery,getByUsernameQuery} from './queries.js'

export class UserService {

    async getUser() {
        const queryUser = getQuery("user");
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserByUsername(username) {
        const queryUser = getByUsernameQuery("user", "username");
        const result = await executeQuery(queryUser, [username]);
        result[0] ? console.log('user found - succeeded') : console.log('user not found');
        return result[0] ? result[0] : null;
    }
}