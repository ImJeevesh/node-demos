import { BuildOptions, Model } from 'sequelize';

export interface UserGroupAttributes {
  id?: string;
  groupId?: string;
  userId?: string;
}

export interface UserGroupInstance extends Model<UserGroupAttributes>, UserGroupAttributes {}

export class UserGroup extends Model<UserGroupInstance, UserGroupAttributes> {}

export type UserGroupStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserGroupInstance;
};
