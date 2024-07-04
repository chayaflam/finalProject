import { executeQuery } from './dataBase.js';
import { getByParamQuery } from './queries/genericQuery.js';

export class ClassService {

    async getIdClass(data) {
        console.log(data.data)
        const queryClass = getByParamQuery("childrenClass",data.condition);
        const result = await executeQuery(queryClass, [data.data]);
        return result[0] ? result : null;
    }
}