export interface AuthenticationService {
  authenticate: (username: string, password: string) => Promise<boolean>;
}
