export interface UserSchemaExtract {
  login: string;
  password: string;
  age: number;
}

export interface User extends UserSchemaExtract {
  id: string;
  isDeleted: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Users extends Array<User> {}
