import { User, Users, UserSchemaExtract } from './../models/user.model';
import sampleUsers from '../db/users.json';
import { v4 } from 'uuid';

// mock DB
let users: Users = [...sampleUsers];

export class UserController {
  getUsers(limit: number): User[] {
    return users.filter(u => !u.isDeleted).slice(0, limit);
  }

  getUser(id: string): User | undefined {
    return users.filter(u => !u.isDeleted).find(user => user.id === id);
  }

  createUser(data: UserSchemaExtract): User {
    // login should be unique, but ignore as it isn't part of scope
    const newUser = <User>{
      ...data,
      id: v4(),
      isDeleted: false
    };
    users.push(newUser);
    return newUser;
  }

  updateUser(id: string, data: UserSchemaExtract): User {
    // login should be unique, but ignore as it isn't part of scope
    const updatedUser = <User>{
      ...data,
      id,
      isDeleted: false
    };
    users = [
      ...users.filter(u => u.id !== id),
      updatedUser
    ];
    return updatedUser;
  }

  deleteUser(id: string): User | undefined {
    const user = this.getUser(id);
    if (user) {
      user.isDeleted = true;
    }
    return user;
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): Users {
    return users.filter((user) =>
      !user.isDeleted && user.login.toLowerCase().includes(loginSubstring?.toLowerCase())
    ).splice(0, limit);
  }
}
