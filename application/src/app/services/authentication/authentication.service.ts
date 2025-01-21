export interface AuthenticationService {
  authenticate: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
