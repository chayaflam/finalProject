import { executeQuery } from '../Service/dataBase.js'
import { postQuery } from '../Service/queries.js'
import {io} from '../socket.js'

export class ChatMessageController {
  async test(msg, clientOffset, callback) {
    try {
      let date = new Date()
      const queryChildren = postQuery("messages");
       result = await executeQuery(queryChildren, [12, msg, date]);
       io.emit('chat message', msg, result)
    } catch (ex) {
      const err = {}
      err.statusCode = 500;
      err.message = ex;
    }
  }
}

