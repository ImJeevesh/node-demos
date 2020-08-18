import { GroupStatic, GroupInstance, PermissionsList } from './group.model';
import { UUIDV4, DataTypes, Sequelize } from 'sequelize';

export function GroupFactory(sequelize: Sequelize): GroupStatic {
  return sequelize.define<GroupInstance>('groups', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...PermissionsList)),
      allowNull: false
    }
  });
}
