import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Admin} from "../constants";

@Injectable({
  providedIn: 'root',
})
export class UserService implements CanActivate{
  private username: string = '';
  private role: string = '';
  private userRoleSubject = new BehaviorSubject<string>('');
  private userId : number;

  constructor(private router: Router) {
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  setUsername(naam: string): void {
    this.username = naam;
  }
  getUsername(): string {
    return this.username;
  }
  getUserRoleObservable(): Observable<string> {
    return this.userRoleSubject.asObservable();
  }
  updateUserRole(newRole: string) {
    this.userRoleSubject.next(newRole);
  }
  getUserRole(): string {
    return this.role;
  }

  setUserRole(rol: string) {
    this.role = rol;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.role === Admin){
      return true
    } else{
      this.router.navigate(['/darts'])
      return false
    }

  }
}
