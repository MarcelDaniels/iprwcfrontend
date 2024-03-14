import {HeaderComponent} from "../../shared/header/header.component";

;// login.component.ts
import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import * as bcrypt from 'bcryptjs';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SaveLoginService} from "../../services/save-login.service";
import {HttpClient} from "@angular/common/http";
import {apiURL} from "../../constants";
import {User} from "../../models/user.model";
import {SentLoginRequestService} from "../../services/sent-login-request.service";
import {JWTService} from "../../services/JWT-service";
import {ToastService} from "../../services/toast-service";

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
  }

    register(): void {
        const { username, password } = this.registerForm.value;
        const hashedPassword = bcrypt.hashSync(password, 10);
        this.http.post(`${this.baseURL}register`, {username, hashedPassword}, {responseType: 'text'})
          .subscribe((data) => {
            this.isError = false
            this.toastType = 'success'
            this.toastService.showOrUpdateToast("Registratie succesvol!", false, 'success');
            this.router.navigate(['/login']);
          })

    }
}
