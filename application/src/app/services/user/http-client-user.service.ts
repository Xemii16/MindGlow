import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {UserService} from "./user.service";
import {UserEmail} from "./user-email";
import {HttpClientHelper} from "../../clients/http-client-helper";


export class HttpClientUserService implements UserService {
  constructor(private httpClient: HttpClient) {}
  changePassword(password: string, oldPassword: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      return this.httpClient.put(HttpClientHelper.buildUrl('/api/v1/authentication'), {
        password: password,
        old_password: oldPassword
      }, {
        withCredentials: true
      }).subscribe({next: () => resolve(true), error: () => resolve(false)})
    })
  }

  changeUserById(id: number, user: User): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      return this.httpClient.put(HttpClientHelper.buildUrl('/api/v1/users/' + id), {
        firstname: user.firstname,
        lastname: user.lastname,
        locked: user.locked
      }, {
        withCredentials: true
      }).subscribe({next: () => resolve(true), error: () => resolve(false)})
    })
  }

  deleteUserById(id: number): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        return this.httpClient.delete(HttpClientHelper.buildUrl('/ap1/v1/users/'+id),{
          withCredentials:true
        }).subscribe({
          next:()=> resolve(true),
          error:()=>resolve(false)
        })
      }
    )
  }

getAllUsers(role: string): Promise<User[]> {
  return new Promise<User[]>((resolve, reject) => {
    this.httpClient.get<User[]>(HttpClientHelper.buildUrl('/api/v1/users'), {
      params: { role: role },
      withCredentials: true
    }).subscribe({
      next: (users) => resolve(users),
      error: (err) => reject(err)
    });
  });
}

  getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.httpClient.get<User>(HttpClientHelper.buildUrl('/api/v1/users/me'), {
        withCredentials: true
      }).subscribe({
        next: (user) => resolve(user),
        error: (err) => reject(err)
      });
    });
  }

  getInformationByEmail(email: string): Promise<UserEmail> {
    return new Promise<UserEmail>((resolve, reject) => {
      this.httpClient.get<UserEmail>(HttpClientHelper.buildUrl('/api/v1/users/email/'+email), {
        withCredentials: true
      }).subscribe({
        next: (userEmail) => resolve(userEmail),
        error: (err) => reject(err)
      });
    });
  }

  getUserById(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.httpClient.get<User>(HttpClientHelper.buildUrl('/api/v1/users/'+id), {
        withCredentials: true
      }).subscribe({
        next: (user) => resolve(user),
        error: (err) => reject(err)
      });
    });
  }

  register(info: { firstname: string, lastname: string, email: string, password: string }): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.httpClient.post<{ id: number }>(HttpClientHelper.buildUrl('/api/v1/users/register'), info, {
        withCredentials: true
      }).subscribe({
        next: () => resolve(true),
        error: () => resolve(false)
      });
    });
  }
}

