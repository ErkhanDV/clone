export function sendConnect(ws, msg) {
  const { gameId, user } = msg;

  ws.game.gameId = gameId;
  ws.game.nickName = user.name;

  const game = this.games[gameId];
  let isReconnect = false;

  this.messageApplier("isStarted", false, msg, ws);

  if (!game) {
    this.messageApplier("isAbleShoot", true, msg, ws);
    this.messageApplier("isGameFinded", false, msg, ws);

    this.games[gameId] = [ws];
    this.gameChats[gameId] = [];
  } else if (game && game.length === 1) {
    isReconnect = this.reconnect(game, ws, user, msg);

    if (!isReconnect) {
      this.messageApplier("isAbleShoot", false, msg, ws);
      msg.opponentName = game[0].nickName;

      game.push(ws);
      game.forEach((wss) => {
        this.messageApplier("isGameFinded", true, msg, wss);
      });
    }
  } else if (game && game.length === 2) {
    isReconnect = this.reconnect(game, ws, user, msg);
  }

  if (isReconnect) {
    msg.isReconnect = true;
  }

  this.connectBroadcast(ws, msg);
}
