import {HeaderComponent} from "../../shared/header/header.component";

import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import * as bcrypt from 'bcryptjs';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SaveLoginService} from "../../services/save-login.service";
import {HttpClient} from "@angular/common/http";
import {apiURL} from "../../constants";
import {SentLoginRequestService} from "../../services/sent-login-request.service";
import {JWTService} from "../../services/JWT-service";
import {ToastService} from "../../services/toast-service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, LoginService, SaveLoginService, HttpClient, SentLoginRequestService, JWTService, HeaderComponent, ToastService]
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  baseURL = apiURL;
  isError: boolean = false;
  toastType: string = '';
  constructor(
    private http: HttpClient,
    private fb: FormBuilder, private sentRequestService : SentLoginRequestService, private router : Router, public toastService : ToastService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
  login(): void {
    const {username, password} = this.loginForm.value;
    this.sentRequestService.login(username, password);
    this.sentRequestService.getLoginStatus().subscribe((loginSuccess) => {
      if (loginSuccess) {
      } else {
        this.isError = true;
        this.toastType = 'error'
        this.toastService.showOrUpdateToast("Gebruikersnaam of wachtwoord onjuist!", true, 'error');
      }
    });
  }

    register(): void {
        const { username, password } = this.registerForm.value;
        if (username == "" || password == "") {
          this.isError = true
          this.toastType = 'error'
        this.toastService.showOrUpdateToast("Vul zowel gebruikersnaam als wachtwoord in!", true, 'error');
        return;
      }
        const hashedPassword = bcrypt.hashSync(password, 10);
        this.http.post(`${this.baseURL}register`, {username, hashedPassword}, {responseType: 'text'})
          .subscribe((data) => {
            this.isError = false
            this.toastType = 'success'
            this.toastService.showOrUpdateToast("Registratie succesvol!", false, 'success');
            this.router.navigate(['/login']);
          }, error => {
            this.toastType = 'error'
            this.isError = true;
            this.toastService.showOrUpdateToast("Deze gebruikersnaam bestaat al!", true, 'error');
          });

    }
}
