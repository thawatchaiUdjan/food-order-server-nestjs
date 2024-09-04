import { User } from 'src/users/schemas/user.schema';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

export interface UserData {
  user: User;
  token: string;
}

export interface UpdateUserRes {
  user: UserData;
  message: string;
}
