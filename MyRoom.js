const colyseus = require('colyseus');

exports.MyRoom = class extends colyseus.Room {

  onCreate (options) {
  }

  onJoin (client, options) {
  }

  onMessage (client, message) {
    this.broadcast({type:"all", bcast : "rcv:"+message.move+" from:"+client.id})
  }

  onLeave (client, consented) {
  }

  onDispose() {
  }

}
