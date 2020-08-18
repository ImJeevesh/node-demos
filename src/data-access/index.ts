import { dbConfig } from './db.config';
import { UserFactory } from '../models/user.factory';
import { GroupFactory } from '../models/group.factory';
import { UserGroupFactory } from '../models/user-group.factory';

const User = UserFactory(dbConfig);
const Group = GroupFactory(dbConfig);

// relationships
const UserGroup = UserGroupFactory(dbConfig);
User.belongsToMany(Group, { as: 'groups', through: UserGroup });
Group.belongsToMany(User, { as: 'users', through: UserGroup });

export {
  User,
  Group,
  UserGroup
};

