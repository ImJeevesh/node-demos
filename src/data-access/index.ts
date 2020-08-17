import { dbConfig } from './db.config';
import { UserFactory } from '../models/user.factory';

export const User = UserFactory(dbConfig);
