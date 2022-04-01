import { DeleteResult, getManager } from "typeorm";

import { ITokenDataToSave } from '../../interfaces';
import { IToken, Token } from "../../entity/token";

class TokenRepository {
  public async createToken(token: ITokenDataToSave): Promise<IToken> {
    return getManager().getRepository(Token).save(token);
  }

  public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
    return getManager().getRepository(Token).findOne({ userId });
  }

  public findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
    return getManager().getRepository(Token).findOne(filterObject); // finds user by access Token
  }

  public async deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult> {
    return getManager().getRepository(Token).delete(findObject); // deletes by userId
  }
}

export const tokenRepository = new TokenRepository();
