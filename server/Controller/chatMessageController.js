import { executeQuery } from '../Service/dataBase.js'


export class ChatMessageController {

  async test(data) {
    try {
      let date= new Date()
      result = await executeQuery(`INSERT INTO finalprojectdb.messages (babyId, message, date) VALUES (?, ?, ?)`, [12, data, date]);
      console.log(result)
      return result;
    } catch (err) {
      throw err;
    }
  }

  async test1(socket) {
    console.log("sadjjkhfabc")
    socket.on('chat message', async (msg, clientOffset, callback) => {
      let result;
      console.log("hyjufydiulrjyguy😋🎁🛹")
      //   try {
      //     // result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
      //     con
      //   } catch (e) {
      //     if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
      //       callback();
      //     } else {
      //       // nothing to do, just let the client retry
      //     }
      //     return;
      //   }
      //   io.emit('chat message', msg, result.lastID);
      //callback();
    });

    // if (!socket.recovered) {
    //   try {
    //     await db.each('SELECT id, content FROM messages WHERE id > ?',
    //       [socket.handshake.auth.serverOffset || 0],
    //       (_err, row) => {
    //         socket.emit('chat message', row.content, row.id);
    //       }
    //     )
    //   } catch (e) {
    //     // something went wrong
    //   }
    // }
  }
}

