
import { executeQuery } from './dataBase.js';
import { getQuery, getByParamQuery } from './queries.js'

export class ClassService {

    async getIdClass(data) {
        console.log(data.data)
        const queryClass = getByParamQuery("nurseryclass",data.condition);
        const result = await executeQuery(queryClass, [data.data]);
        return result[0] ? result : null;
    }

}