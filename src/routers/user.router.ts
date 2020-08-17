import { userValidator, UserRequestSchema } from '../schemas/user.schema';
import express, { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UserInstance } from '../models/user.model';
import { userService } from '../services';
import 'express-async-errors'; // acts as global try catch

export const userRoutes = express.Router({
  strict: true
});

const sendUserResponse = (res: Response, next:NextFunction, user: UserInstance | null | undefined) => {
  if (user) {
    return res.json({ user });
  }
  throw new Error('User not found or deleted!');
};

userRoutes.post('/create', userValidator, async (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) => {
  const user = await userService.createUser(req.body);
  return sendUserResponse(res, next, user);
});

userRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getUser(req.params.id);
  return sendUserResponse(res, next, user);
});

userRoutes.put('/:id', userValidator, async (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return sendUserResponse(res, next, user);
});

userRoutes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.deleteUser(req.params.id);
  return sendUserResponse(res, next, user);
});

userRoutes.get('/auto-suggest/:query/:limit', async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.params.limit, 10);
  if (req.params.query) {
    const users = await userService.getAutoSuggestUsers(req.params.query, isNaN(limit) ? 5 : limit);
    return res.json({ users });
  }
  return next(new Error("Input query can't be empty"));
});

