import { BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin } from 'sequelize';
import { BuildOptions, Model } from 'sequelize';
import { UserInstance } from './user.model';

export enum PermissionsMap {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}

export const PermissionsList = Object.values(PermissionsMap);

export type Permissions = keyof typeof PermissionsMap;

export interface GroupAttributes {
  id?: string;
  name: string;
  permissions: Array<Permissions>;
}

export interface GroupInstance extends Model<GroupAttributes>, GroupAttributes {
  addUsers: BelongsToManyAddAssociationsMixin<UserInstance, UserInstance['id']>
}

export class Group extends Model<GroupInstance, GroupAttributes> {}

export type GroupStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): GroupInstance;
};
