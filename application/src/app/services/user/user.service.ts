import {User} from "./user";
import {UserEmail} from "./user-email";

export interface UserService {
  getUserById: (id: number) => Promise<User | null>;
  changeUserById: (id: number, user: User) => Promise<boolean>;
  deleteUserById: (id: number) => Promise<boolean>;
  changePassword: (password: string, oldPassword: string) => Promise<boolean>;
  register: (user: User) => Promise<boolean>;
  getAllUsers: (role: string) => Promise<User[]>;
  getCurrentUser: () => Promise<User | null>;
  getInformationByEmail: (email: string) => Promise<UserEmail | null>;
}
