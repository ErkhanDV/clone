import { ModelUser } from "../models/user-model.js";
import { tokenService } from "./token-service.js";
import { ApiError } from "../exeptions/api-eror.js";

class UserService {
  async updateUser(user) {
    const resUser = {
      name: user.name,
      id: user._id,
    };
    const tokens = tokenService.generateTokens(resUser);

    await tokenService.saveToken(user._id, tokens.refreshToken);

    if (tokens && resUser) {
      return { ...tokens, ...resUser };
    } else {
      throw ApiError.TokenError();
    }
  }

  async logIn(name) {
    const candidate = await ModelUser.findOne({ name });

    if (candidate) {
      throw ApiError.DoubleNameError();
    }

    const user = await ModelUser.create({ name });

    if (user) {
      return this.updateUser(user);
    } else {
      throw ApiError.AuthorizationError("Ошибка создания пользователя");
    }
  }

  async logOut(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const user = await ModelUser.findOne({ _id: userData.id });

    if (!user) {
      throw ApiError.ExitError();
    } else {
      await ModelUser.deleteOne({ _id: userData.id });
      await tokenService.removeToken(refreshToken);
    }
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.TokenError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenInDB = await tokenService.findToken(refreshToken);

    if (!userData) {
      await tokenService.removeToken(refreshToken);
      throw ApiError.TokenError();
    }

    if (userData && !tokenInDB) {
      throw ApiError.TokenError();
    }

    const user = await ModelUser.findById(userData.id);

    return this.updateUser(user);
  }

  async getUsers() {
    const users = await ModelUser.find();

    if (!users) {
      throw ApiError.GetUsersError();
    }

    return users;
  }
}

export const userService = new UserService();
