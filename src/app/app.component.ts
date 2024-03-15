import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    AppModule
  ]
})
export class AppComponent {
}
