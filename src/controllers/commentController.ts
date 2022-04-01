import {Request, Response} from "express";
import {getManager} from "typeorm";

import {Comment} from "../entity/comment";

class CommentController {
  public async getCommentsAndPostsOfUserById (req:Request, res:Response) {
    try {
      const { userId } = req.params;

      const postWithComments = await getManager()
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.post', 'post')
        .where(`comment.authorId = :id`, { id: Number(userId) }) // :id parameter name and id: Number(userId) - its value
        .getMany()

      res.json(postWithComments);
    } catch (err) {
      console.log(err)
    }
  }

  public async addLikeOrDislike (req:Request, res:Response) {
    const { commentId, action } = req.body;

    const comment = await getManager()
      .getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id: Number(commentId) })
      .getOne();

    if (!comment) {
      throw new Error('Comment id does not exist!')
    }

    if (action === 'like') {
      await getManager().getRepository(Comment).update( { id: commentId },
        { like: comment.like + 1 });
    }

    if (action === 'dislike') {
      await getManager().getRepository(Comment).update({ id: commentId },
        { dislike: comment.dislike + 1 })
    }

    res.json(comment);
  }
}

module.exports = new CommentController();
