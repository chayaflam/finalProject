
import { executeQuery } from './dataBase.js';
import { getQuery, getByParamQuery,getChildrenByTeacherId } from './queries.js'

export class ChildrenService {

    async getChildren(data) {
        console.log(data.data)
        const queryChildren = getByParamQuery("child",data.condition);
        const result = await executeQuery(queryChildren, [data.data]);
        return result[0] ? result : null;
    }

    async getIdClass(data) {
        console.log(data.data)
        const queryClass = getByParamQuery("nurseryclass",data.condition);
        const result = await executeQuery(queryClass, [data.data]);
        return result[0] ? result : null;
    }

    async getChildrenByTeacherId(data){
        const queryClass = getChildrenByTeacherId(data);
        const result = await executeQuery(queryClass);
        console.log( result)
        return result ? result : null;

    }
}