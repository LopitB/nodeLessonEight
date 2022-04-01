import {Router} from "express";

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.getUsersWithSpecificText);

userRouter.get('/:email', userController.getUserByEmail);

userRouter.post('/', userController.createUser);

userRouter.patch('/:userId', userController.updateUserEmailAndPasswordById);

// userRouter.delete('/:userId', async (req:Request, res:Response) => {
//   const { userId } = req.params;
//   console.log(req.body)
//   const deletedUser = await getManager().getRepository(User).delete({ id: Number(userId) })
//   res.json(deletedUser);
// })

userRouter.delete('/:userId', userController.deleteUserById);

module.exports = userRouter;
