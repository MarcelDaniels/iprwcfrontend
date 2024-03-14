import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {WinkelmandjeStatusService} from "../../services/winkelmandje-status.service";
import {Observable, of, Subscription, tap} from "rxjs";
import {SaveLoginService} from "../../services/save-login.service";
import {AuthService} from "../../services/auth.service";
import {JWTService} from "../../services/JWT-service";
import {Admin} from "../../constants";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [SaveLoginService, AuthService, JWTService]

})
export class HeaderComponent implements OnInit{
  collapsed = true;
  protected readonly Admin = Admin;
  userRole$: Observable<string> = of('');

  aantalItemsInWinkelmandje: Observable<number>;

  constructor(private winkelmandjeStatusService: WinkelmandjeStatusService, private saveLoginService : SaveLoginService, private userService : UserService) {
  }

  ngOnInit(): void {
    this.aantalItemsInWinkelmandje = this.winkelmandjeStatusService.aantalItems$;
    this.userRole$ = this.userService.getUserRoleObservable();
  }

  logout(): void {
    this.saveLoginService.logout();
  }


}
