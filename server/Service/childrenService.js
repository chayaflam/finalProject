
import { executeQuery } from './dataBase.js';
import { getQuery, getByParamQuery } from './queries.js'

export class ChildrenService {

    async getChildren(data) {
        console.log(data.data)
        const queryChildren = getByParamQuery("child",data.condition);
        const result = await executeQuery(queryChildren, [data.data]);
        return result[0] ? result : null;
    }

  
}