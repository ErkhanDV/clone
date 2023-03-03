export function sendShoot(ws, msg) {
  const { nickName, gameId } = ws.game;
  const { shoot } = msg;
  const game = this.games[gameId];
  const damageUser = game.find((wss) => wss.game.nickName !== nickName);

  const isDamaged = damageUser.game.field.ships.some((ship) => {
    const isHitted = ship.shipLocation.some((cell) => cell === shoot);

    if (isHitted) {
      damageUser.game.isAbleShoot = false;

      this.messageApplier("isAbleShoot", true, msg, ws);
      ship.woundedCells.push(shoot);
    }

    return isHitted;
  });

  if (!isDamaged) {
    damageUser.game.isAbleShoot = true;

    this.messageApplier("isAbleShoot", false, msg, ws);
    damageUser.game.field.misses.push(shoot);
  }

  const isGameOver = damageUser.game.field.ships.every(
    (ship) => ship.decks === ship.woundedCells.length
  );

  if (isGameOver) {
    msg.method = "gameover";
    msg.winner = nickName;
  }

  msg.user = ws.game.nickName;

  this.connectBroadcast(ws, msg);
}
