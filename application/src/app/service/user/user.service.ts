import {Injectable} from '@angular/core';
import {apiUrl} from "../../utility/storage";
import {HttpClient} from "@angular/common/http";
import {JwtService} from "../jwt/jwt.service";
import {PupilsResponse} from "./response/pupils.response";
import {UserResponse} from "./response/user.response";
import {UsersResponse} from "./response/users.response";
import {UserRequest} from "./request/user.request";
import {TeachersResponse} from "./response/teachers.response";
import {ChangeCredentialsRequest} from "./request/change-credentials.request";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = apiUrl + '/api/v1/users';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {
  }

  /**
   * Повертає користувача за токеном навіть якщо його акаунт не активовано
   */
  getUserByToken(): Promise<UserResponse | null> {
    return new Promise((resolve) => {
      this.http.get<UserResponse>(this.url + "/me", {
        headers: {
          "Authorization": 'Bearer ' + this.jwtService.getRefreshToken()
        }
      })
        .subscribe({
        next: (response: UserResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getUserById(id: string): Promise<UserResponse | null> {
    return new Promise((resolve) => {
      this.http.get<UserResponse>(this.url + "/id/" + id).subscribe({
        next: (response: UserResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  /**
   * Повертає користувача за токеном навіть якщо його акаунт не активовано
   */
  getUserByTokenAsync(): Promise<UserResponse | null> {
    return new Promise((resolve) => {
      this.jwtService.getRefreshTokenAsync().then((token) => {
        this.http.get<UserResponse>(this.url + "/me", {
          headers: {
            "Authorization": 'Bearer ' + token
          }
        }).subscribe({
          next: (response: UserResponse) => {
            resolve(response);
          },
          error: (err) => {
            resolve(null);
          }
        });
      });
    });
  }

  getUsersWithPagination(enabled: boolean = true, startWith: string = '', page: number, size: number = 50): Promise<UsersResponse | null> {
    return new Promise((resolve) => {
      this.http.get<UsersResponse>(this.url + "?pagination=true" + "&page=" + page + "&size=" + size + "&startWith=" + startWith + "&enabled=" + enabled).subscribe({
        next: (response: UsersResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  putUser(user: UserRequest): Promise<void> {
    return new Promise((resolve) => {
      this.http.put(this.url, user).subscribe({
        next: () => {
          resolve();
        },
        error: (err) => {
          resolve();
        }
      });
    });

  }

  deleteUser(user: UserResponse): Promise<void> {
    return new Promise((resolve) => {
      this.http.delete(this.url + "/" + user.id).subscribe({
        next: () => {
          resolve();
        },
        error: (err) => {
          resolve();
        }
      });
    });

  }

  getPupilsWithPaginationAndStartWith(enabled: boolean = true, startWith: string = '', page: number, size: number = 50): Promise<PupilsResponse | null> {
    return new Promise((resolve) => {
      this.http.get<PupilsResponse>(this.url + "/pupils" + "?pagination=true" + "&page=" + page + "&size=" + size + "&startWith=" + startWith + "&enabled=" + enabled).subscribe({
        next: (response: PupilsResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getPupilsWithPagination(enabled: boolean = true, page: number, size: number = 50): Promise<PupilsResponse | null> {
    return new Promise((resolve) => {
      this.http.get<PupilsResponse>(this.url + "/pupils" + "?pagination=true" + "&page=" + page + "&size=" + size + "&enabled=" + enabled).subscribe({
        next: (response: PupilsResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getPupils(enabled: boolean = true): Promise<PupilsResponse | null> {
    return new Promise((resolve) => {
      this.http.get<PupilsResponse>(this.url + "/pupils" + "?enabled=" + enabled).subscribe({
        next: (response: PupilsResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getTeachersWithPaginationAndStartWith(enabled: boolean = true, startWith: string = '', page: number, size: number = 50): Promise<TeachersResponse | null> {
    return new Promise((resolve) => {
      this.http.get<TeachersResponse>(this.url + "/teachers" + "?pagination=true" + "&page=" + page + "&size=" + size + "&startWith=" + startWith + "&enabled=" + enabled).subscribe({
        next: (response: TeachersResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getTeachersWithPagination(enabled: boolean = true, page: number, size: number = 50): Promise<TeachersResponse | null> {
    return new Promise((resolve) => {
      this.http.get<TeachersResponse>(this.url + "/teachers" + "?pagination=true" + "&page=" + page + "&size=" + size + "&enabled=" + enabled).subscribe({
        next: (response: TeachersResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getTeachers(enabled: boolean = true): Promise<TeachersResponse | null> {
    return new Promise((resolve) => {
      this.http.get<TeachersResponse>(this.url + "/teachers" + "?enabled=" + enabled).subscribe({
        next: (response: TeachersResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  changePassword(currentPassword: string, newPassword: string, confirmationPassword: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.patch(this.url, {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmationPassword: confirmationPassword
      }).subscribe({
        next: () => {
          resolve(true)
        },
        error: (err) => {
          resolve(false);
        }
      });
    });
  }

  changeCredentials(request: ChangeCredentialsRequest): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.patch(this.url + "/credentials", request).subscribe({
        next: () => {
          resolve(true)
        },
        error: (err) => {
          resolve(false);
        }
      });
    });
  }
}
