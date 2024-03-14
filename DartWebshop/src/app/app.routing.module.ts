// app-routing.module.ts

import { Routes } from '@angular/router';
import {NgModule} from "@angular/core";
import {DartPijlenComponent} from "./components/dart-pijlen/dart-pijlen.component";
import {WinkelwagenComponent} from "./shared/winkelwagen/winkelwagen.component";
import {WinkelmandOverzichtComponent} from "./shared/winkelwagen/winkelmand-overzicht/winkelmand-overzicht.component";
import {DartbordComponent} from "./components/dartbord/dartbord.component";
import {SurroundsComponent} from "./components/surrounds/surrounds.component";
import {LoginComponent} from "./components/login/login.component";
import {AdminComponent} from "./components/admin/admin.component";
import {UserService} from "./services/user.service";

export const routes: Routes = [
    { path: '', redirectTo: '/darts', pathMatch: 'full' },
    { path: 'darts', component: DartPijlenComponent },
    { path: 'winkelmandje', component: WinkelmandOverzichtComponent },
    { path: 'boards', component: DartbordComponent },
    { path: 'surrounds', component: SurroundsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [UserService]},

];
