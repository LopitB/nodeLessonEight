import bcrypt from 'bcrypt';

import {IUser} from "../entity/user";
import {userRepository} from "../repositories/user/userRepository";

class UserService {
  public async createUser(user: IUser): Promise<IUser> {
    const {password} = user; // extracting password for hashing
    const hashedPassword = await UserService._hashPassword(password);
    const dataToSave = { ...user, password: hashedPassword }; // in user object, reassigning password for hashed one

    return userRepository.createUser(dataToSave);
  }

  public async getUserByEmail(email: string): Promise<IUser | undefined> {
    return userRepository.getUserByEmail(email);
  }

  public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
    const isPasswordsEqual = await bcrypt.compare(password, hash);

    // function can only return error. only purpose is to check if pass matches
    if (!isPasswordsEqual) {
      throw new Error('Email or password is incorrect'); 
    }
  }

  private static async _hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // 10 - level of salt = higher lvl means stronger hashing
  }
}

export const userService = new UserService();
