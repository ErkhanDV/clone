import { AxiosError } from 'axios';
import { axiosAPI } from './_interceptors';
import { STATUS, CLONE_SERVER } from './_constants';
import { IStartGame } from './_types';

export class gameService {
  static async startGame(
    friendName = '',
    isWithFriend = false,
  ): Promise<IStartGame | string | undefined> {
    try {
      if (isWithFriend) {
        const { status, data } = await axiosAPI.patch<IStartGame>(
          `${CLONE_SERVER}/startgame`,
          { friend: friendName },
          { headers: { 'with-friend': 'true' } },
        );

        if (status === STATUS.ok && data) {
          return data;
        }
      } else {
        const { status, data } = await axiosAPI.patch<IStartGame>(
          `${CLONE_SERVER}/startgame`,
        );

        if (status === STATUS.ok && data) {
          return data;
        }
      }

      return undefined;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { status, message } = error.response.data;
        console.log(`status: ${status}; error: ${message}`);
        return message;
      }
      console.log(error);
    }

    return undefined;
  }
}
