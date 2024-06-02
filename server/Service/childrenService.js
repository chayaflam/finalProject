
import { executeQuery } from './dataBase.js';
import { getQuery,getByParamQuery} from './queries.js'

export class ChildrenService {

    async getChildren(data) {
        console.log(data)
        const queryChildren = getByParamQuery("child","teacherId");
        const result = await executeQuery(queryChildren,[data]);
        return result[0] ? result[0] : null;
    }
}