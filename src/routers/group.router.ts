import { GroupInstance } from './../models/group.model';
import express, { Request, Response, NextFunction } from 'express';
import { groupService } from '../services';
import 'express-async-errors'; // acts as global try catch

export const groupRoutes = express.Router({
  strict: true
});

const sendGroupResponse = (res: Response, next:NextFunction, group: GroupInstance | null | undefined) => {
  if (group) {
    return res.json({ group });
  }
  throw new Error('Group not found or deleted!');
};

groupRoutes.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const group = await groupService.createGroup(req.body);
  return sendGroupResponse(res, next, group);
});

groupRoutes.get('/all', async (req: Request, res: Response) => {
  const groups = await groupService.getGroups();
  return res.json({ groups });
});

groupRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const group = await groupService.getGroup(req.params.id);
  return sendGroupResponse(res, next, group);
});

groupRoutes.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const group = await groupService.updateGroup(req.params.id, req.body);
  return sendGroupResponse(res, next, group);
});

groupRoutes.put('/:id/add-users', async (req: Request, res: Response) => {
  if (!req.body.users) {
    throw new Error('users missing in request body');
  }
  await groupService.addUsersToGroup(req.params.id, req.body.users);
  return res.json({ message: 'users added successfully!' });
});

groupRoutes.delete('/:id', async (req: Request, res: Response) => {
  await groupService.deleteGroup(req.params.id);
  return res.json({ message: 'Group deleted successfully!' });
});

