import { User } from './../models/user.model';
import { userValidator, UserRequestSchema } from './../schemas/user.schema';
import express, { Request, Response, NextFunction } from 'express';
import { userController } from '../controllers';
import { ValidatedRequest } from 'express-joi-validation';

export const userRoutes = express.Router({
  strict: true
});

const sendUserResponse = (res: Response, next:NextFunction, user: User | undefined) => {
  if (user) {
    return res.json({ user });
  }
  next(new Error('User not found or deleted!'));
};

userRoutes.post('/create', userValidator, (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) => {
  const user = userController.createUser(req.body);
  return sendUserResponse(res, next, user);
});

userRoutes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const user = userController.getUser(req.params.id);
  return sendUserResponse(res, next, user);
});

userRoutes.put('/:id', userValidator, (req: ValidatedRequest<UserRequestSchema>, res: Response, next: NextFunction) => {
  const user = userController.updateUser(req.params.id, req.body);
  return sendUserResponse(res, next, user);
});

userRoutes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const user = userController.deleteUser(req.params.id);
  return sendUserResponse(res, next, user);
});

userRoutes.get('/auto-suggest/:query/:limit', (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.params.limit, 10);
  if (req.params.query) {
    const users = userController.getAutoSuggestUsers(req.params.query, isNaN(limit) ? 5 : limit);
    return res.json({ users });
  }
  next(new Error("Input query can't be empty"));
});

