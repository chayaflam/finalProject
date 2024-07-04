
import { executeQuery } from './dataBase.js';
import { getFeedingDataQuery } from './queries/messagesQuery.js';

export class MessagesService {

    async getFeedingData(childId) {
        const queryUser = getFeedingDataQuery();
        const result = await executeQuery(queryUser,[childId]);
        return result;
    }
}