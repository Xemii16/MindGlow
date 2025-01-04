import {User} from "./user";
import {UserEmail} from "./user-email";

export interface UserService {
  getUserById: (id: number) => Promise<User>;
  changeUserById: (id: number, user: User) => Promise<boolean>;
  deleteUserById: (id: number) => Promise<boolean>;
  changePassword: (password: string, oldPassword: string) => Promise<boolean>;
  register: (info: {firstname: string, lastname: string, email: string, password: string}) => Promise<boolean>;
  getAllUsers: (role: string) => Promise<User[]>;
  getCurrentUser: () => Promise<User>;
  getInformationByEmail: (email: string) => Promise<UserEmail>;
}
