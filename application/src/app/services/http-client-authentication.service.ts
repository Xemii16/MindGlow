import {AuthenticationService} from "./authentication.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpClientHelper} from "../clients/http-client-helper";

@Injectable({
  providedIn: 'root'
})
export class HttpClientAuthenticationService implements AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username: string, password: string): Promise<boolean> {
    return new Promise(resolve => {
      this.httpClient.post(HttpClientHelper.buildUrl("/api/v1/authenticate"), {}, {
        params: {
          username: username,
          password: password
        }
      }).subscribe({next: () => resolve(true), error: () => resolve(false)})
    })
  }

}
