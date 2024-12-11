import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _apiUrl = 'http://localhost:8080/api/v1';
  constructor() {}


  get apiUrl(): string {
    return this._apiUrl;
  }
}
