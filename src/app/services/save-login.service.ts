// auth.service.ts

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {WinkelmandjeStatusService} from "./winkelmandje-status.service";
import {WinkelmandOverzichtComponent} from "../shared/winkelwagen/winkelmand-overzicht/winkelmand-overzicht.component";
import {UserService} from "./user.service";
import {WinkelmandjeService} from "./winkelmandje.service";


@Injectable({
  providedIn: 'root',
})
export class SaveLoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  user = {} as User;
   constructor(private router: Router, private winkelmandjeStatusService : WinkelmandjeStatusService, private userService: UserService, private winkelmand : WinkelmandjeService) {
   }
  login() {

    this.isLoggedInSubject.next(true);
  }

  logout() {
       this.user.id = 0;
       this.winkelmandjeStatusService.emptyCart();
       this.winkelmand.leegWinkelmandje();
       this.userService.setUserRoleFalse();
    this.router.navigate(["/login"])
    this.isLoggedInSubject.next(false);
  }

}
