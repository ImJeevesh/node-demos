import { groupRoutes } from './routers/group.router';
import { dbConfig } from './data-access/db.config';
import { userRoutes } from './routers/user.router';
import express, { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

dbConfig
  .sync()
  .then(() => console.log('Connected to DB'))
  .catch((reason) => {
    throw `DB connection error: ${reason}`;
  });

export const PORT = process.env.PORT || 4000;
export const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/group', groupRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((error: ExpressJoiError | any, _req: Request, res: Response, next: NextFunction) => {
  // Bad Request
  res.status(400).send({
    error: (error.error ?? error).toString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
