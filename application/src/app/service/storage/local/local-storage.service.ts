import {afterNextRender, afterRender, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    isRender: Promise<boolean>;
    constructor() {
        this.isRender = new Promise<boolean>((resolve) => {
            afterRender(() => resolve(true));
        });
    }
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    getAsync(key: string): Promise<string | null> {
        return new Promise<string | null>((resolve) => {
            this.isRender.then(() => resolve(localStorage.getItem(key)));
        });
    }

    setAsync(key: string, value: string): void {
        this.isRender.then(() => {
            localStorage.setItem(key, value);
        });
    }

    removeAsync(key: string): void {
        this.isRender.then(() => {
            localStorage.removeItem(key);
        });
    }
}
