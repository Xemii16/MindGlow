export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  locked: boolean;
  enabled: boolean;
}
