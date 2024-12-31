export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "PUPIL";
  locked: boolean;
  enabled: boolean;
}
