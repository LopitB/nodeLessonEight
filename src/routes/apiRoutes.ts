import {authRouter} from "./authRouter";

const { Router } = require('express');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');

const routes = Router();

routes.use('/users', userRouter);
routes.use('/posts', postRouter);
routes.use('/comments', commentRouter);
routes.use('/auth', authRouter);

module.exports = routes;
