import {UserResponse} from "./user.response";

export interface UsersResponse {
    users: UserResponse[];
    hasNext?: boolean;
}
