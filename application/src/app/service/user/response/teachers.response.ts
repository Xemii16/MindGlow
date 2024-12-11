import {UserResponse} from "./user.response";

export interface TeachersResponse {
  users: UserResponse[];
  hasNext?: boolean;
}
