import { BuildOptions, Model } from 'sequelize';

export interface UserSchemaExtract {
  login: string;
  password: string;
  age: number;
}

export interface UserAttributes extends UserSchemaExtract {
  id: string;
  isDeleted: boolean;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserInstance, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserInstance;
};
