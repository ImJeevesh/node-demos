import { UserInstance, UserStatic } from './user.model';
import { UUIDV4, DataTypes, Sequelize } from 'sequelize';

export function UserFactory(sequelize: Sequelize): UserStatic {
  return sequelize.define<UserInstance>('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
}
