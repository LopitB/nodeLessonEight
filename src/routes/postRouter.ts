import {Router} from "express";

const postController = require('../controllers/postController');
const postRouter = Router();

postRouter.get('/:userId', postController.getPostsByUserId);

postRouter.patch('/:userId', postController.updatePostTextById);

module.exports = postRouter;
