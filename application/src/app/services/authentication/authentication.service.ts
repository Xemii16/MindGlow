export interface AuthenticationService {
  authenticate: (email: string, password: string) => Promise<boolean>;
}
