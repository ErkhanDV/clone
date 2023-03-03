import {
  sendConnect,
  sendDisconnect,
  sendReady,
  sendShoot,
  sendExit,
  sendChat,
  useReconnect,
  sendInvite,
} from "./socketHandlers/_index.js";

export class SocketService {
  constructor(wsInstance) {
    this.wsInstance = wsInstance;
    this.games = {};
    this.gameChats = {};
    this.commonChat = [];
    this.info = wsInstance.getWss();
    this.latestDate = "";
  }

  connectHandler(ws, msg) {
    sendConnect.call(this, ws, msg);
  }

  disconnectHandler(ws, msg) {
    sendDisconnect.call(this, ws, msg);
  }

  readyHandler(ws, msg) {
    sendReady.call(this, ws, msg);
  }

  shootHandler(ws, msg) {
    sendShoot.call(this, ws, msg);
  }

  exitHandler(ws, msg) {
    sendExit.call(this, ws, msg);
  }

  chatHandler(ws, msg) {
    sendChat.call(this, ws, msg);
  }

  inviteHandler(ws, msg) {
    sendInvite.call(this, ws, msg);
  }

  reconnect(game, ws, user, msg) {
    return useReconnect.call(this, game, ws, user, msg);
  }

  sendOnline() {
    const msg = {};
    msg.method = "online";
    let count = 0;
    const names = [];

    this.info.clients.forEach((client) => {
      if (client.socketName) {
        names.push(client.socketName);
      } else {
        names.push("Unknown user");
      }

      count++;
    });

    msg.count = count - 1;
    msg.names = names;

    this.info.clients.forEach((client) => {
      client.send(JSON.stringify(msg));
    });
  }

  connectBroadcast(ws, msg) {
    const { gameId } = ws.game;

    this.info.clients.forEach((client) => {
      if (msg.method === "chat") {
        client.send(JSON.stringify(msg));
        return;
      }

      if (msg.method === "invite") {
        if (client.socketName === msg.friend) {
          client.send(JSON.stringify(msg));
          return;
        }
      }

      if (client.game.gameId === gameId && gameId) {
        if (msg.method !== "chat") {
          client.send(JSON.stringify(msg));
        }

        if (msg.method === "exit") {
          client.game = {};
        }
      }
    });
  }

  messageApplier(key, value, msg, wss) {
    msg[key] = wss.game[key] = value;
  }

  mailing(ws, chat) {
    const chatContent =
      chat === "common" ? this.commonChat : this.gameChats[ws.game.gameId];
    const msg = {
      method: "mailing",
      chatName: chat,
      chatMessage: chatContent,
    };

    ws.send(JSON.stringify(msg));
  }
}
