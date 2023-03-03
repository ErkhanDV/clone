export function sendReady(ws, msg) {
  const { nickName, gameId } = ws.game;
  const { field } = msg;
  const game = this.games[gameId];

  game.forEach((wss) => {
    if (wss.game.nickName === nickName) {
      wss.game.field = field;
    }
  });

  if (game.length === 2) {
    const isStarted = game.every((ws) => ws.game.field);

    if (isStarted) {
      game.forEach((ws) => (ws.game.isStarted = true));
      msg.isStarted = true;
    }
  } else {
    game.forEach((ws) => (ws.game.isStarted = false));
    msg.isStarted = false;
  }

  msg.user = ws.game.nickName;

  this.connectBroadcast(ws, msg);
}
