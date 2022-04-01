import { userService } from '../services/userService';
import { Request, Response } from "express";

import { COOKIE } from '../constants/cookie';
import { IUser } from '../entity/user';
import { IRequestExtended } from '../interfaces';
import { authService, tokenService } from "../services";
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
  public async registration(req: Request, res: Response) {
    try {
      const data = await authService.registration(req.body);
      res.cookie(
        'refreshToken',
        data?.refreshToken,
        { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true } // httpOnly for security (will not allow malicious JS code)
      );

      return res.json(data);
    } catch (e: any) {
      console.log(e);
    }
  }

  public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
    const { id } = req.user as IUser; // user may noy be found

    await tokenService.deleteUserTokenPair(id);

    return res.json('Ok');
  }

  public async login(req: IRequestExtended, res: Response) {
    try {
      const { id, email, password: hashPassword } = req.user as IUser;
      const { password } = req.body; // extract password from input to check if it matches

      await userService.compareUserPasswords(password, hashPassword);

      const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

      await tokenRepository.createToken({
        refreshToken,
        accessToken,
        userId: id
      })

      res.json({
        refreshToken,
        accessToken,
        user: req.user,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export const authController = new AuthController();
