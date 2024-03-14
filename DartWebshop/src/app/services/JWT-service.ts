import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class JWTService implements HttpInterceptor{
  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercept()")
    const token = this.authService.token;
    console.log(token)
      request = request.clone({
        setHeaders: {
          'Authorization' : `Bearer ${token}`
        }
      });
    return next.handle(request);
  }
}
