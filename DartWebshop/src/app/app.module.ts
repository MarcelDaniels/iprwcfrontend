import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DartPijlenComponent } from './components/dart-pijlen/dart-pijlen.component';
import { WinkelwagenComponent } from './shared/winkelwagen/winkelwagen.component';
import { WinkelmandOverzichtComponent } from './shared/winkelwagen/winkelmand-overzicht/winkelmand-overzicht.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./components/login/login.component";
import {AdminComponent} from "./components/admin/admin.component";
import {JWTService} from "./services/JWT-service";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {DartbordComponent} from "./components/dartbord/dartbord.component";
import {SurroundsComponent} from "./components/surrounds/surrounds.component";

@NgModule({
    declarations: [
        HeaderComponent,
        DartPijlenComponent,
        WinkelwagenComponent,
        WinkelmandOverzichtComponent,
      LoginComponent,
      AdminComponent,
      DartbordComponent,
      SurroundsComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    providers: [],
    exports: [
        HeaderComponent
    ],
})
export class AppModule { }
