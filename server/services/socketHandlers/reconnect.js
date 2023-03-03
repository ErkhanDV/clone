export function useReconnect(game, ws, user, msg) {
  let replaceUser;
  let replaceIndex;
  let opponent;

  game.forEach((wss, i) => {
    if (wss.game.nickName === user.name) {
      replaceUser = wss;
      replaceIndex = i;
    } else {
      opponent = wss;
    }
  });

  if (replaceUser) {
    const { isAbleShoot, isGameFinded, isStarted } = replaceUser.game;


    this.mailing(ws, "game");
    this.messageApplier("isAbleShoot", isAbleShoot, msg, ws);
    this.messageApplier("isGameFinded", isGameFinded, msg, ws);
    this.messageApplier("isStarted", isStarted, msg, ws);

    if (replaceUser.game.field) {
      const { field } = replaceUser.game;
      this.messageApplier("field", field, msg, ws);
    }


    game[replaceIndex] = ws;

    if (opponent) {
      msg.opponentName = opponent.game.nickName;
      if (opponent.game.field) {
        msg.opponentField = opponent.game.field;
      }
    }

    return true;
  }

  return false;
}
