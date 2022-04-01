import jwt from "jsonwebtoken"

import { config } from "../config/config";
import { IToken } from "../entity/token";
import { tokenRepository } from "../repositories/token/tokenRepository";
import { IUserPayload, ITokenPair } from '../interfaces';

class TokenService {
  public generateTokenPair(payload: IUserPayload): ITokenPair {
    try {
      const accessToken = jwt.sign(
        payload,
        config.SECRET_ACCESS_KEY as string,
        {expiresIn: config.EXPIRES_IN_ACCESS}
      ); // first - what to hash, second - key word

      const refreshToken = jwt.sign(
        payload,
        config.SECRET_REFRESH_KEY as string,
        {expiresIn: config.EXPIRES_IN_REFRESH}
      );

      return {
        accessToken,
        refreshToken
      }
    } catch (e: any) {
      console.log(e);
      throw new Error(e);
    }

  }

  public async saveToken(userId: number, refreshToken: string, accessToken: string): Promise<IToken> {
    try {
      const tokenFromDb = await tokenRepository.findTokenByUserId(userId);

      if (tokenFromDb) {
        tokenFromDb.refreshToken = refreshToken;
        tokenFromDb.accessToken = accessToken;

        return tokenRepository.createToken(tokenFromDb); // refreshed token
      }

      return tokenRepository.createToken({ accessToken, refreshToken, userId }); // created token
    } catch (e: any) {
      console.log(e);
      throw new Error(e);
    }
  }

  // used for both refresh and access tokens (to verify and de-hash them)
  public verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
    let secretWord = config.SECRET_ACCESS_KEY;

    if (tokenType === 'refresh') {
      secretWord = config.SECRET_REFRESH_KEY;
    }

    return jwt.verify(authToken, secretWord as string) as IUserPayload;
  }

  public async deleteUserTokenPair(userId: number) {
    return tokenRepository.deleteByParams({ userId });
  }
}

export const tokenService = new TokenService();
