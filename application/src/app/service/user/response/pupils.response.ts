import {UserResponse} from "./user.response";


export interface PupilsResponse {
  users: UserResponse[];
  hasNext?: boolean;
}
