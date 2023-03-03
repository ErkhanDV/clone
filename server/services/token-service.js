import jwt from "jsonwebtoken";
import { ModelToken } from "../models/token-model.js";
import { ApiError } from "../exeptions/api-eror.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {
      expiresIn: "24h",
    });
    return { accessToken, refreshToken };
  }

  validateAcessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_ACCESS);
      return userData;
    } catch (error) {
      throw ApiError.TokenError();
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_REFRESH);
      return userData;
    } catch (error) {
      throw ApiError.TokenError();
    }
  }

  async saveToken(id, refreshToken) {
    const tokenData = await ModelToken.findOne({ userId: id });
    if (tokenData) {
      await ModelToken.updateOne({userId: id}, {refreshToken})
      return;
    }
    const token = await ModelToken.create({ userId: id, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await ModelToken.deleteOne({
      refreshToken,
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await ModelToken.findOne({
      refreshToken,
    });
    return tokenData;
  }
}

export const tokenService = new TokenService();
