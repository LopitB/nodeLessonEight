import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';

class UserMiddleware {
  async checkIfUserExists(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const userFromDB = await userRepository.getUserByEmail(req.body.email); // body = user obj

      if (!userFromDB) {
        res.status(404).json('User not found');
        return;
      }

      req.user = userFromDB; // if user exists, transfer next;
      next();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
