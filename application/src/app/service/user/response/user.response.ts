export interface UserResponse {
  id: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  enabled?: boolean;
  locked?: boolean;
}
