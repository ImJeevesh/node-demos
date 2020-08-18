import { userService } from './index';
import { GroupInstance, GroupAttributes } from './../models/group.model';
import { Group, UserGroup } from './../data-access/index';
import { dbConfig } from '../data-access/db.config';
import { Transaction } from 'sequelize';
import 'express-async-errors'; // acts as global try catch

export class GroupService {
  async getGroups(): Promise<GroupInstance[]> {
    return await Group.findAll();
  }

  async getGroup(id: string, transaction: Transaction | null = null): Promise<GroupInstance | null> {
    return await Group.findByPk(id, {
      ...(transaction ? { transaction } : {}),
      include: UserGroup
    });
  }

  async createGroup(data: GroupAttributes): Promise<GroupInstance> {
    return await Group.create(data);
  }

  async updateGroup(id: string, data: GroupAttributes): Promise<GroupInstance| undefined> {
    const [, group] = await Group.update(data, {
      where: {
        id
      },
      returning: true
    });
    return group?.shift();
  }

  async deleteGroup(id: string): Promise<number> {
    // destroy existing relations
    await UserGroup.destroy({
      where: {
        groupId: id
      }
    });
    return await Group.destroy({
      where: {
        id
      }
    });
  }

  async addUsersToGroup(groupId: string, userIds: string[]): Promise<GroupInstance | null> {
    try {
      return await dbConfig.transaction(async (transaction) => {
        const group = await this.getGroup(groupId, transaction);
        const users = await userService.getUsersWithIds(userIds, transaction);
        await group?.addUsers(users, { transaction });
        return group;
      });
    } catch (error) {
      throw new Error(`addUsersToGroup: ${error.toString()}`);
    }
  }
}
