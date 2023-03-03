import { tokenService } from "../services/token-service.js";
import { userService } from "./user-service.js";
import { ModelUser } from "../models/user-model.js";
import { ApiError } from "../exeptions/api-eror.js";

class GameService {
  async startGame(refreshToken, withFriend, friendName) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const users = await userService.getUsers();

    const reconnectUser = users.find((user) => {
      return userData.id === user._id.toString() && !!user.gameId;
    });

    const opponent = users.find((user) => user.isWaitingGame);
    let gameId;

    if (withFriend && friendName) {
      const friend = users.find((user) => friendName === user.name);

      if (friend) {
        await ModelUser.updateOne(
          { _id: userData.id },
          { isWaitingGame: false, gameId: friend.gameId }
        );

        return {
          gameId: friend.gameId,
          user: { id: userData.id, name: userData.name },
        };
      } else {
        throw ApiError.GameError();
      }
    }

    if (withFriend && !friendName) {
      await ModelUser.updateOne(
        { _id: userData.id },
        { isWaitingGame: false, gameId: userData.id }
      );

      return {
        gameId: userData.id,
        user: { id: userData.id, name: userData.name },
      };
    }

    if (reconnectUser) {
      return {
        gameId: reconnectUser.gameId,
        user: { id: userData.id, name: userData.name },
      };
    }

    if (opponent) {
      gameId = opponent.gameId;

      await ModelUser.updateOne(
        { _id: opponent._id },
        { isWaitingGame: false }
      );

      await ModelUser.updateOne({ _id: userData.id }, { gameId: gameId });
    } else {
      gameId = userData.id;

      await ModelUser.updateOne(
        { _id: userData.id },
        { isWaitingGame: true, gameId: gameId }
      );
    }

    return {
      gameId: gameId,
      user: { id: userData.id, name: userData.name },
    };
  }
}

export const gameService = new GameService();
