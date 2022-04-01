import {Request, Response} from "express";
import { getManager } from "typeorm";

import {Post} from "../entity/post";

class PostController {
  public async getPostsByUserId (req:Request, res:Response) {
    const { userId } = req.params;

    const post = await getManager()
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoin('User', 'user', 'user.id = post.userId')
      .where('post.userId = :id', { id: Number(userId) })
      .getMany()

    res.json(post);
  }

  public async updatePostTextById (req:Request, res:Response) {
    const { postId } = req.params;
    const { text } = req.body;

    const updatedText = await getManager()
      .getRepository(Post)
      .update({ id: Number(postId) }, { text })

    res.json(updatedText);
  }
}

module.exports = new PostController();
