import { userRoutes } from './routes/user.route';
import express, { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

export const PORT = process.env.PORT || 4000;
export const app = express();

app.use(express.json());

app.use('/user', userRoutes);

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
