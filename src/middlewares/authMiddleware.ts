import { tokenRepository } from '../repositories/token/tokenRepository';
import { IRequestExtended } from '../interfaces';
import { userService } from '../services';
import { NextFunction, Response } from 'express';
import { tokenService } from '../services';

class AuthMiddleware {
  public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const accessToken  = req.get('Authorization');

      if (!accessToken) {
        throw new Error('Token is invalid!');
      }

      const { userEmail } = tokenService.verifyToken(accessToken);

//   tokenService.verifyToken(authToken) = {
//    userId: 7,
//    userEmail: 'Marlboro3@mail.com',
//    iat: 1648212421, // created
//    exp: 1648298821 // expires
//   }

      const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

      if (!tokenPairFromDB) {
        throw new Error('Token is invalid!')
      }

      const userFromToken = await userService.getUserByEmail(userEmail);

      if (!userFromToken) {
        throw new Error('Wrong token');
      }

      req.user = userFromToken; // extended request (object)

      next();
    } catch (error: any) {
      res.json({
        status: 400,
        message: error.message,
        tokenValue: req.get('Authorization')
      })
    }
  }
}

export const authMiddleware = new AuthMiddleware();
