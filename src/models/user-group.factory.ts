import { UserGroupInstance, UserGroupStatic } from './user-group.model';
import { UUIDV4, DataTypes, Sequelize } from 'sequelize';

export function UserGroupFactory(sequelize: Sequelize): UserGroupStatic {
  return sequelize.define<UserGroupInstance>('user-groups', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    }
  });
}
