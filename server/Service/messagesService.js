
import { executeQuery } from './dataBase.js';
import { getQuery,getByParamQuery,getFeedingDataQuery} from './queries.js'

export class MessagesService {

    async getFeedingData(childId) {
        const queryUser = getFeedingDataQuery();
        const result = await executeQuery(queryUser,[childId]);
        console.log("👨‍🦰👨‍🦰👨‍🦰👨‍🦰👨‍🦰👨‍🦰👨‍🦰👨‍🦰👨‍🦰👨‍🦰",result)
        return result;
    }
}