import {MINDGLOW_SERVER_HOST, MINDGLOW_SERVER_PORT} from "../mindglow-const";

export class HttpClientHelper {

  static buildUrl(path: string): string {
    return "http://" + MINDGLOW_SERVER_HOST + ":" + MINDGLOW_SERVER_PORT + path;
  }
}
