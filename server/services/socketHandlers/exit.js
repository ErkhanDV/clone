import { ModelUser } from "../../models/user-model.js";

export async function sendExit(ws, msg) {
  const { gameId } = ws.game;

  if (this.games.hasOwnProperty(`${gameId}`)) {
    for (let ws of this.games[gameId]) {
      await ModelUser.updateOne(
        { name: ws.game.nickName },
        { isWaitingGame: false, gameId: "" }
      );
    }

    delete this.games[gameId];
  }

  msg.user = ws.game.nickName;
  this.connectBroadcast(ws, msg);
}
