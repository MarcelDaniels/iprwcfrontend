import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {apiURL} from "../constants";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = apiURL + 'login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password};
    return this.http.post(this.apiUrl, body);
  }
}
