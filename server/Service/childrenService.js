import { executeQuery } from './dataBase.js';
import { getChildrenByTeacherId } from './queries/childrenQuery.js';
import { getByParamQuery } from './queries/genericQuery.js';


export class ChildrenService {

    async getChildren(data) {
        console.log(data.data)
        const queryChildren = getByParamQuery("child",data.condition);
        const result = await executeQuery(queryChildren, [data.data]);
        return result[0] ? result : null;
    }

    async getIdClass(data) {
        console.log(data.data)
        const queryClass = getByParamQuery("childrenClass",data.condition);
        const result = await executeQuery(queryClass, [data.data]);
        return result[0] ? result : null;
    }

    async getChildrenByTeacherId(data){
        const queryClass = getChildrenByTeacherId(data);
        const result = await executeQuery(queryClass);
        return result ? result : null;
    }
}