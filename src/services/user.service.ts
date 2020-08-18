import { User, UserGroup } from './../data-access/index';
import { UserInstance, UserSchemaExtract } from '../models/user.model';
import { Op, Transaction } from 'sequelize';
import 'express-async-errors'; // acts as global try catch

export class UserService {
  async getUsers(limit: number): Promise<UserInstance[]> {
    return await User.findAll({
      where: {
        isDeleted: false
      },
      limit
    });
  }

  async getUsersWithIds(ids: string[], transaction: Transaction | null = null): Promise<UserInstance[]> {
    // return await User.findByPk(id);
    return await User.findAll({
      where: {
        id: {
          [Op.in]: ids
        },
        isDeleted: false
      },
      ...(transaction ? { transaction } : {})
    });
  }

  async getUser(id: string): Promise<UserInstance | null> {
    // return await User.findByPk(id);
    return await User.findOne({
      where: {
        id,
        isDeleted: false
      }
    });
  }

  async createUser(data: UserSchemaExtract): Promise<UserInstance> {
    return await User.create(<UserInstance>data);
  }

  async updateUser(id: string, data: UserSchemaExtract): Promise<UserInstance| undefined> {
    const [, user] = await User.update(<UserInstance>data, {
      where: {
        id,
        isDeleted: false
      },
      returning: true
    });
    return user?.shift();
  }

  async deleteUser(id: string): Promise<UserInstance | undefined> {
    // destroy existing relations
    await UserGroup.destroy({
      where: {
        userId: id
      }
    });
    const [, user] = await User.update(<UserInstance>{
      isDeleted: true
    }, {
      where: {
        id
      },
      returning: true
    });
    return user?.shift();
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserInstance[]> {
    return await User.findAll({
      where: {
        isDeleted: false,
        login: {
          [Op.iLike]: `%${loginSubstring}%`
        }
      },
      limit
    });
  }
}
