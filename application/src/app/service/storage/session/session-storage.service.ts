import {afterRender, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    isRender: Promise<boolean>;
    constructor() {
        this.isRender = new Promise<boolean>((resolve) => {
            afterRender(() => resolve(true));
        });
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    getAsync(key: string): Promise<string | null>{
        return new Promise<string | null>((resolve) => {
            this.isRender.then(() => resolve(localStorage.getItem(key)));
        });
    }
}
