import {getManager} from "typeorm";
import {Request, Response} from "express";

import {IUser, User} from "../entity/user";
import {userService} from "../services";

class UserController {
  public async getUsersWithSpecificText (req:Request, res:Response) {
    try {
      // const users = await getManager().getRepository(User).findOne({ where: { firstName: 'Taras' } });
      // const users = await getManager().getRepository(User).find({ relations: ['posts'] }); // posts will not be shown without relations

      // const users = await getManager().getRepository(User)
      //   .createQueryBuilder('user')
      //   .where('user.firstName = "Taras"')
      //   .getOne()

      const users = await getManager().getRepository(User)
        .createQueryBuilder('user')
        .leftJoin('Posts', 'posts', 'posts.userId = user.id') // left join to Posts table as posts
        .where('posts.text = "lol"')
        .getMany() // returns users with text lol

      return res.json(users)
    } catch (err) {
      console.log(err);
    }
  }

  public async createUser (req:Request, res:Response): Promise<Response<IUser>> {
    const createdUser = await userService.createUser(req.body);

    return res.json(createdUser);
  }

  public async getUserByEmail (req: Request, res: Response): Promise<Response<IUser>> {
    const {email} = req.params;
    const user = await userService.getUserByEmail(email);

    return res.json(user);
  }

  public async updateUserEmailAndPasswordById (req:Request, res:Response) {
    const { password, email } = req.body;
    const { userId } = req.params;

    const createdUser = await getManager().getRepository(User).update({ id: Number(userId) }, {
      password,
      email
    })

    res.json(createdUser);
  }

  public async deleteUserById (req:Request, res:Response) {
    const { userId } = req.params;

    const deletedUser = await getManager()
      .getRepository(User)
      .softDelete({ id: Number(userId) }) // soft delete will leave data about client and fill deletedAt column

    res.json(deletedUser);
  }
}

module.exports = new UserController();
