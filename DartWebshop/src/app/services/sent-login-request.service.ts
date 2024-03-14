import {ChangeDetectorRef, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Admin, AdminFromRequest, apiURL, Customer, CustomerFromRequest} from "../constants";
import {BehaviorSubject, Subject} from "rxjs";
import {HeaderComponent} from "../shared/header/header.component";
import {UserService} from "./user.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class SentLoginRequestService {
  baseURL = apiURL;
  userRole: string = '';
  user = {} as User;

  private usernameUrl: string = apiURL + 'user/name/';



  private loggedInSubject: Subject<boolean> = new Subject<boolean>();
  loggedIn$ = this.loggedInSubject.asObservable();
  constructor( private http: HttpClient, private authService : AuthService, private router : Router, private userService : UserService) {
  }
  login(username: string, password: string): void {
    this.http.post(`${this.baseURL}login`, { username, password }, { responseType: 'text' })
      .subscribe((data) => {
        const messageParts = data.split("+");
        const tokenAndUserIdPart = messageParts[0];
        const { token, user_id: userId } = JSON.parse(tokenAndUserIdPart);
        this.authService.token = token;
        this.user.id = userId;
        this.userService.setUserId(userId)
        this.getRole(username);
      });
  }

  getRole(username: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    this.http.get<{ code: string, payload: string, message: string}>(this.usernameUrl + username, {headers}).subscribe(
      (user) => {
        const [messagePart1] = user.message.split('+');
        this.userRole = this.chooseRole(messagePart1);
        this.userService.updateUserRole(this.userRole);
        this.userService.setUserRole(this.userRole);
        this.router.navigate(['/darts']);
      },
      (error) => {
      }
    );
  }

  chooseRole(role: string){
    switch (role) {
      case AdminFromRequest:
        return Admin;
      case CustomerFromRequest:
        return Customer;
      default:
        return Customer;
    }
  }

}
