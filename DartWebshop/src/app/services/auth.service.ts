
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {apiURL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = apiURL;
  private _token: string = '';
  private isLoggedIn: boolean = false;
  private _userId: string = '';




  constructor(private http: HttpClient) {}


  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  login(): void {
    this.isLoggedIn = true;
  }

}
