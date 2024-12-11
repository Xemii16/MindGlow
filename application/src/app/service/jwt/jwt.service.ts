import {Injectable} from '@angular/core';
import {LocalStorageService} from "../storage/local/local-storage.service";
import {SessionStorageService} from "../storage/session/session-storage.service";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../storage/storage.service";

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    private readonly url: string = 'http://localhost:8080/api/v1' + '/auth';

    constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService, private http: HttpClient, private storage: StorageService) {
    }

    getAccessToken(): string | null {
        return this.localStorage.get('access_token') ?? this.sessionStorage.get('access_token') ?? null;
    }

    getAccessTokenAsync(): Promise<string | null> {
        return this.localStorage.getAsync('access_token') ?? this.sessionStorage.getAsync('access_token') ?? Promise.resolve(null);
    }

    getRefreshToken(): string | null {
        return this.localStorage.get('refresh_token') ?? this.sessionStorage.get('refresh_token') ?? null;
    }

    getRefreshTokenAsync(): Promise<string | null> {
        return this.localStorage.getAsync('refresh_token') ?? this.sessionStorage.getAsync('refresh_token') ?? Promise.resolve(null);
    }

    getAvailableToken(): string | null {
        return this.getAccessToken() ?? this.getRefreshToken() ?? null;
    }

    saveTokens(accessToken: string, refreshToken: string, forSession: boolean = false): void {
        if (forSession) {
            this.sessionStorage.set('access_token', accessToken);
            this.sessionStorage.set('refresh_token', refreshToken);
            return;
        }

        this.localStorage.set('access_token', accessToken);
        this.localStorage.set('refresh_token', refreshToken);
    }

    removeTokens() {
        this.removeAccessToken();
        this.removeRefreshToken();
    }

    removeAccessToken() {
        this.localStorage.remove('access_token');
        this.sessionStorage.remove('access_token');
    }

    removeRefreshToken() {
        this.localStorage.remove('refresh_token');
        this.sessionStorage.remove('refresh_token');
    }
}
