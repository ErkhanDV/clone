import { ModelUser } from "../../models/user-model.js";

export async function sendDisconnect(ws, msg) {
  msg.user = ws.game.nickName;
  msg.method = "disconnect";

  const currGame = this.games[ws.game.gameId];

  if (currGame) {
    const gameIsEnded = currGame.every((wss) => {
      return wss.readyState === 3;
    });

    if (gameIsEnded) {
      for (let ws of currGame) {
        await ModelUser.updateOne(
          { name: ws.game.nickName },
          { isWaitingGame: false, gameId: "" }
        );
      }

      delete this.games[ws.game.gameId];
    }
  }

  this.connectBroadcast(ws, msg);
}
