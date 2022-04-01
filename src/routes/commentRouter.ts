import {Router} from "express";

const commentRouter = Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/:userId', commentController.getCommentsAndPostsOfUserById);

commentRouter.patch('/action', commentController.addLikeOrDislike);

module.exports = commentRouter;
