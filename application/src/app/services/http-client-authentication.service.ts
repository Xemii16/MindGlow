import {AuthenticationService} from "./authentication.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpClientHelper} from "../clients/http-client-helper";

@Injectable({
  providedIn: 'root'
})
export class HttpClientAuthenticationService implements AuthenticationService {

  private readonly path: string = "/api/v1/authentication";

  constructor(private httpClient: HttpClient) {
  }

  authenticate(email: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      this.httpClient.post(HttpClientHelper.buildUrl(this.path), {}, {
        withCredentials: true,
        params: {
          email: email,
          password: password
        }
      }).subscribe({next: () => resolve(true), error: () => resolve(false)})
    })
  }

}
